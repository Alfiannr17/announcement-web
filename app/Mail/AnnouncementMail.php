<?php

namespace App\Mail;

use App\Models\AnnouncementRecipient;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AnnouncementMail extends Mailable
{
    use Queueable, SerializesModels;

    public AnnouncementRecipient $recipient;

    public function __construct(AnnouncementRecipient $recipient)
    {
        $this->recipient = $recipient;
    }

    public function build()
    {
        $announcement = $this->recipient->announcement()->with('attachments')->first();
        $employee     = $this->recipient->employee;

        $mail = $this->subject($announcement->subject ?? $announcement->title)
            ->view('emails.announcement', [
                'announcement' => $announcement,
                'employee'     => $employee,
        
            ]);

        foreach ($announcement->attachments as $attachment) {
            $mail->attachFromStorageDisk(
                'public',
                $attachment->file_path,
                $attachment->original_name
            );
        }

        return $mail;
    }
}
