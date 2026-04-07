<?php

use App\Http\Controllers\JobListingController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('jobs', [JobListingController::class, 'index'])->name('jobs');
Route::get('jobs/{job}', [JobListingController::class, 'show'])->name('jobs.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
