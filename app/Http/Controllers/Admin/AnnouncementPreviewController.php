<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Employee;
use Illuminate\Http\Request;

class AnnouncementPreviewController extends Controller
{
    public function __invoke(Request $request)
    {
        $announcement = new Announcement([
            'title'   => $request->input('title', 'Judul Pengumuman'),
            'body'    => $request->input('body', "Isi pengumuman akan tampil di sini..."),
            'sender'  => $request->input('sender', 'Unit / Departemen'),
            'sent_at' => now(),
        ]);

        $employee = new Employee([
            'name'       => 'Nama Karyawan',
            'photo_path' => null, // biar pakai avatar default di template
        ]);

        // render view email YANG SAMA dipakai saat kirim email beneran
        $html = view('emails.announcement', [
            'announcement' => $announcement,
            'employee'     => $employee,
            'photoCid'     => null, // di preview tidak embed CID
        ])->render();

        return response()->json([
            'html' => $html,
        ]);
    }
}
