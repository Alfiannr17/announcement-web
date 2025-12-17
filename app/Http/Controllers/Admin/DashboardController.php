<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Announcement;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
{
    
    $announcementStats = Announcement::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
        ->whereYear('created_at', date('Y'))
        ->groupBy('month')
        ->orderBy('month')
        ->get()
        ->map(function ($item) {
            return [
                'name' => date('F', mktime(0, 0, 0, $item->month, 1)), // Mengubah angka bulan ke Nama Bulan
                'total' => $item->total
            ];
        });

    return Inertia::render('Admin/Dashboard', [
        'totalEmployee' => Employee::count(),
        'totalAnnouncement' => Announcement::count(),
        'chartData' => $announcementStats,
    ]);
}
}
