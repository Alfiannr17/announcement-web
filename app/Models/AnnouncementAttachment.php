<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnnouncementAttachment extends Model
{
    protected $fillable = [
        'announcement_id',
        'file_path',
        'original_name',
        'mime_type',
    ];

    public function announcement()
    {
        return $this->belongsTo(Announcement::class);
    }
}
