<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobListing;
use Inertia\Inertia;

class JobListingController extends Controller
{
    public function index(Request $request)
    {
        $jobs = JobListing::query()
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%");
            })
            ->get();

        return inertia('public/jobs/list', [
            'jobs' => $jobs,
            'filters' => $request->only('search'),
        ]);
    }

    public function show(JobListing $job) 
    {
        return Inertia::render('public/jobs/show', [
            'job' => $job,
        ]);
    }
}
