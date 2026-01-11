<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Employee;
use Illuminate\Http\Request;
use Mews\Purifier\Facades\Purifier; // Import Facade

class AnnouncementPreviewController extends Controller
{
    public function __invoke(Request $request)
    {
        $cleanBody = Purifier::clean($request->input('body', "Isi pengumuman akan tampil di sini..."));

        $announcement = new Announcement([
            'title'   => $request->input('title', 'Judul Pengumuman'),
            'body'    => $cleanBody,
            'sender'  => $request->input('sender', 'Unit / Departemen'),
            'sent_at' => now(),
        ]);

        $employee = new Employee([
            'name'       => 'Nama Karyawan',
            'photo_path' => null, 
        ]);

        $html = view('emails.announcement', [
            'announcement' => $announcement,
            'employee'     => $employee,
            'photoCid'     => null, 
        ])->render();

        return response()->json([
            'html' => $html,
        ]);
    }
}