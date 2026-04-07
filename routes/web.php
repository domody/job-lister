<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\JobListingController as AdminJobListingController;
use App\Http\Controllers\JobListingController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', [JobListingController::class, 'index'])->name('home');
// Route::get('jobs', [JobListingController::class, 'index'])->name('jobs');
Route::get('jobs/{job}', [JobListingController::class, 'show'])->name('jobs.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('dashboard', '/admin/dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::get('jobs', [AdminJobListingController::class, 'index'])->name('jobs.index');
    Route::get('jobs/create', [AdminJobListingController::class, 'create'])->name('jobs.create');
    Route::post('jobs', [AdminJobListingController::class, 'store'])->name('jobs.store');
    Route::get('jobs/{job}/edit', [AdminJobListingController::class, 'edit'])->name('jobs.edit');
    Route::put('jobs/{job}', [AdminJobListingController::class, 'update'])->name('jobs.update');
    Route::delete('jobs/{job}', [AdminJobListingController::class, 'destroy'])->name('jobs.destroy');
});

require __DIR__.'/settings.php';
