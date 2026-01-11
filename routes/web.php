<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\AnnouncementPreviewController;
use App\Http\Controllers\EmailTrackingController;



Route::get('/', function(){
    return redirect()->route('admin.dashboard');
});

Route::get('/email/track/{id}', EmailTrackingController::class)
    ->name('email.track')
    ->middleware('signed');

Route::middleware(['auth', 'verified'])
->prefix('admin')
->name('admin.')
->group(function(){
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('employees', EmployeeController::class);
    Route::resource('announcements', AnnouncementController::class)->only([
            'index', 'create', 'store', 'show'
        ]);

    Route::get('/about', function () {
    return Inertia::render('Admin/About');
    })->name('about');    

    Route::post('/announcements/preview-email', AnnouncementPreviewController::class)
            ->name('announcements.preview');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

require __DIR__.'/auth.php';
