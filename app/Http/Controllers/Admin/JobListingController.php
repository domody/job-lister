<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobListingController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/jobs/index', [
            'jobs' => JobListing::latest()->paginate(20),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/jobs/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'company'     => ['required', 'string', 'max:255'],
            'location'    => ['required', 'string', 'max:255'],
            'salary_min'  => ['required', 'integer', 'min:0'],
            'salary_max'  => ['required', 'integer', 'min:0', 'gte:salary_min'],
            'type'        => ['required', 'in:full-time,part-time,contract,freelance'],
            'description' => ['required', 'string'],
        ]);

        JobListing::create($validated);

        return redirect()->route('admin.jobs.index')->with('success', 'Job listing created.');
    }

    public function edit(JobListing $job)
    {
        return Inertia::render('admin/jobs/edit', [
            'job' => $job,
        ]);
    }

    public function update(Request $request, JobListing $job)
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'company'     => ['required', 'string', 'max:255'],
            'location'    => ['required', 'string', 'max:255'],
            'salary_min'  => ['required', 'integer', 'min:0'],
            'salary_max'  => ['required', 'integer', 'min:0', 'gte:salary_min'],
            'type'        => ['required', 'in:full-time,part-time,contract,freelance'],
            'description' => ['required', 'string'],
        ]);

        $job->update($validated);

        return redirect()->route('admin.jobs.index')->with('success', 'Job listing updated.');
    }

    public function destroy(JobListing $job)
    {
        $job->delete();

        return redirect()->route('admin.jobs.index')->with('success', 'Job listing deleted.');
    }
}
