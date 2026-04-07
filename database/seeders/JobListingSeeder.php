<?php

namespace Database\Seeders;

use App\Models\JobListing;
use Illuminate\Database\Seeder;

class JobListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobs = [
            [
                'title' => 'Frontend Developer',
                'company' => 'Acme Corp',
                'location' => 'London, UK',
                'salary_min' => 45000,
                'salary_max' => 60000,
                'type' => 'full-time',
                'description' => 'We are looking for a frontend developer with React experience.',
            ],
            [
                'title' => 'Backend Engineer',
                'company' => 'Globex',
                'location' => 'Remote',
                'salary_min' => 55000,
                'salary_max' => 75000,
                'type' => 'full-time',
                'description' => 'Laravel and PostgreSQL experience required.',
            ],
            [
                'title' => 'UI/UX Designer',
                'company' => 'Initech',
                'location' => 'Manchester, UK',
                'salary_min' => 35000,
                'salary_max' => 50000,
                'type' => 'contract',
                'description' => 'Figma-first designer needed for a 6 month contract.',
            ],
        ];

        foreach ($jobs as $job) {
            JobListing::create($job);
        }
    }
}
