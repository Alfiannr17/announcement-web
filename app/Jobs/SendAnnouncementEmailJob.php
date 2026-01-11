<?php

namespace App\Jobs;

use App\Mail\AnnouncementMail;
use App\Models\AnnouncementRecipient;
use Illuminate\Bus\Batchable; 
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendAnnouncementEmailJob implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $recipientId;

    public function __construct(int $recipientId)
    {
        $this->recipientId = $recipientId;
    }

    public function handle(): void
    {
        if ($this->batch()?->cancelled()) {
            return;
        }

        $recipient = AnnouncementRecipient::with(
            'announcement.attachments', 
            'announcement',
            'employee'
        )->find($this->recipientId);

        if (! $recipient) {
            return;
        }

        try {
            Mail::to($recipient->email_snapshot)
                ->send(new AnnouncementMail($recipient));

            $recipient->update([
                'status' => 'sent',
                'error_message' => null,
            ]);
        } catch (\Throwable $e) {
            $recipient->update([
                'status' => 'failed',
                'error_message' => $e->getMessage(),
            ]);
        }
    }
}