<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = [
        'title',
        'body',
        'sender',
        'created_by',
        'sent_at',
    ];

    protected $casts = [
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
