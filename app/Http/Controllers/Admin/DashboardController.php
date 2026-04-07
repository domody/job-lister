<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobListing;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('admin/dashboard', [
            'stats' => [
                'total'   => JobListing::count(),
                'by_type' => JobListing::selectRaw('type, count(*) as count')
                    ->groupBy('type')
                    ->pluck('count', 'type'),
                'recent'  => JobListing::latest()->take(5)->get(),
            ],
        ]);
    }
}
