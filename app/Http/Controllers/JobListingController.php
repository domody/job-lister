<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobListing;
use Inertia\Inertia;

class JobListingController extends Controller
{
    public function index()
    {
        return Inertia::render('public/jobs/list', [
            'jobs' => JobListing::all()
        ]);
    }

    public function show(JobListing $job) 
    {
        return Inertia::render('public/jobs/show', [
            'job' => $job,
        ]);
    }
}
