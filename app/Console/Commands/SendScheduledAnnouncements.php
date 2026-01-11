<?php

namespace App\Console\Commands;

use App\Jobs\SendAnnouncementEmailJob;
use App\Models\Announcement;
use App\Models\AnnouncementRecipient;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Log;

class SendScheduledAnnouncements extends Command
{
    protected $signature = 'announcements:send-scheduled';
    protected $description = 'Send announcements that are scheduled to be published';

    public function handle()
    {
        $announcements = Announcement::whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->whereNull('sent_at')
            ->get();

        if ($announcements->isEmpty()) {
            return;
        }

        foreach ($announcements as $announcement) {
            $this->info("Processing announcement: {$announcement->title}");

            $recipients = AnnouncementRecipient::where('announcement_id', $announcement->id)
                ->where('status', 'pending')
                ->get();

            if ($recipients->isEmpty()) {
                continue;
            }

            $jobs = [];
            foreach ($recipients as $recipient) {
                $jobs[] = new SendAnnouncementEmailJob($recipient->id);
            }

            if (count($jobs) > 0) {
                Bus::batch($jobs)
                    ->name('Scheduled Announcement: ' . $announcement->title)
                    ->onQueue('default')
                    ->dispatch();
                
                $announcement->update(['sent_at' => now()]);
                
                 Log::info("Announcement '{$announcement->title}' has been successfully dispatched to the queue.");
            }
        }
    }
}