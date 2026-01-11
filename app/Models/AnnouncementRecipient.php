<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnnouncementRecipient extends Model
{
    protected $fillable = [
        'announcement_id',
        'employee_id',
        'email_snapshot',
        'status',
        'error_message',
        'read_at',
    ];

    protected $casts = [
    'read_at' => 'datetime',
    ];

    public function announcement()
    {
        return $this->belongsTo(Announcement::class);
    }

    public function employee()
    {
        return $this->belongsTo(\App\Models\Employee::class);
    }


}
