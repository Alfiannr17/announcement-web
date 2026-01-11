<?php

namespace App\Mail;

use App\Models\AnnouncementRecipient;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AnnouncementMail extends Mailable
{
    use Queueable, SerializesModels;

    public $recipient;

    public function __construct(AnnouncementRecipient $recipient)
    {
        $this->recipient = $recipient;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->recipient->announcement->subject ?? $this->recipient->announcement->title,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.announcement',
            with: [
                'announcement' => $this->recipient->announcement,
                'employee'     => $this->recipient->employee,
                'recipient'    => $this->recipient, 
            ],
        );
    }

    public function attachments(): array
    {
        $attachments = [];

        foreach ($this->recipient->announcement->attachments as $file) {
             $attachments[] = storage_path('app/public/' . $file->file_path);
        }

        return $attachments;
    }
}