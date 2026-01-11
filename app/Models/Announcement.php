<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = [
        'title',
        'subject',
        'body',
        'sender',
        'published_at', 
        'sent_at',
        'created_by',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'sent_at' => 'datetime',
    ];

    public function recipients()
    {
        return $this->hasMany(AnnouncementRecipient::class);
    }

    public function attachments()
    {
        return $this->hasMany(AnnouncementAttachment::class);
    }
}
