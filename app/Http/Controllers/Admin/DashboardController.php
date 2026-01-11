<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Announcement;
use App\Models\AnnouncementRecipient; // Tambahkan ini
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Logika Grafik (TIDAK DIUBAH, Tetap Punya Anda)
        $announcementStats = Announcement::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => date('F', mktime(0, 0, 0, $item->month, 1)),
                    'total' => $item->total
                ];
            });

        // 2. [TAMBAHAN BARU] Hitung Global Read Rate & Total Terkirim
        $totalSent = AnnouncementRecipient::where('status', 'sent')->count();
        $totalRead = AnnouncementRecipient::whereNotNull('read_at')->count();
        $globalReadRate = $totalSent > 0 ? round(($totalRead / $totalSent) * 100) : 0;

        // 3. [TAMBAHAN BARU] Ambil 5 Pengumuman Terakhir dengan stat per item
        $recentAnnouncements = Announcement::withCount(['recipients as sent_count' => function($query) {
                $query->where('status', 'sent');
            }])
            ->withCount(['recipients as read_count' => function($query) {
                $query->whereNotNull('read_at');
            }])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($announcement) {
                return [
                    'id' => $announcement->id,
                    'title' => $announcement->title,
                    'sender' => $announcement->sender,
                    'sent_at' => $announcement->sent_at,
                    'sent_count' => $announcement->sent_count,
                    'read_count' => $announcement->read_count,
                    // Hitung rate per item
                    'read_rate' => $announcement->sent_count > 0 
                        ? round(($announcement->read_count / $announcement->sent_count) * 100) 
                        : 0,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'totalEmployee' => Employee::count(),
            'totalAnnouncement' => Announcement::count(),
            'chartData' => $announcementStats,
            // Kirim data tambahan ke frontend
            'totalEmailsSent' => $totalSent,
            'globalReadRate' => $globalReadRate,
            'recentAnnouncements' => $recentAnnouncements,
        ]);
    }
}