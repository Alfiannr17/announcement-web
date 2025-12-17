<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\AnnouncementPreviewController;



Route::get('/', function(){
    return redirect()->route('admin.dashboard');
});

Route::middleware(['auth', 'verified'])
->prefix('admin')
->name('admin.')
->group(function(){
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('employees', EmployeeController::class);
    Route::resource('announcements', AnnouncementController::class)->only([
            'index', 'create', 'store', 'show'
        ]);

    Route::post('/announcements/preview-email', AnnouncementPreviewController::class)
            ->name('announcements.preview');
});

////


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
