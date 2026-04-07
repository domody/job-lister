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
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('company', 'like', "%{$search}%");
                });
            })
            ->when($request->type, function ($query, $types) {
                $query->whereIn('type', (array) $types);
            })
            ->when($request->filled('salary_min'), function ($query) use ($request) {
                $query->where('salary_max', '>=', (int) $request->salary_min);
            })
            ->when($request->filled('salary_max'), function ($query) use ($request) {
                $query->where('salary_min', '<=', (int) $request->salary_max);
            })
            ->get();

        return inertia('public/jobs/list', [
            'jobs' => $jobs,
            'filters' => $request->only('search', 'type', 'salary_min', 'salary_max'),
        ]);
    }

    public function show(JobListing $job) 
    {
        return Inertia::render('public/jobs/show', [
            'job' => $job,
        ]);
    }
}
