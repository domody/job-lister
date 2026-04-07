<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class JobListingFactory extends Factory
{
    private static array $titles = [
        'Frontend Developer', 'Backend Engineer', 'Full Stack Developer', 'DevOps Engineer',
        'Data Engineer', 'Machine Learning Engineer', 'Mobile Developer', 'iOS Developer',
        'Android Developer', 'Software Engineer', 'Platform Engineer', 'Site Reliability Engineer',
        'Cloud Architect', 'Security Engineer', 'QA Engineer', 'UI/UX Designer',
        'Product Designer', 'Graphic Designer', 'Product Manager', 'Engineering Manager',
        'Technical Lead', 'Staff Engineer', 'Principal Engineer', 'Solutions Architect',
        'Data Scientist', 'Data Analyst', 'Business Analyst', 'Scrum Master',
        'Technical Writer', 'Database Administrator', 'Systems Administrator', 'Network Engineer',
        'PHP Developer', 'Laravel Developer', 'React Developer', 'Vue.js Developer',
        'Node.js Developer', 'Python Developer', 'Ruby on Rails Developer', 'Go Developer',
        'Rust Developer', 'Java Developer', 'Kotlin Developer', 'Swift Developer',
        'C# Developer', '.NET Developer', 'TypeScript Developer', 'WordPress Developer',
        'Shopify Developer', 'Salesforce Developer', 'Infrastructure Engineer',
    ];

    private static array $companies = [
        'Acme Corp', 'Globex', 'Initech', 'Umbrella Ltd', 'Stark Industries',
        'Wayne Enterprises', 'Hooli', 'Pied Piper', 'Massive Dynamic', 'Oscorp',
        'Bluth Company', 'Dunder Mifflin Tech', 'Veridian Dynamics', 'Cyberdyne Systems',
        'Buy N Large', 'Soylent Corp', 'Aperture Science', 'Black Mesa', 'Abstergo',
        'Rekall', 'Tyrell Corporation', 'Weyland-Yutani', 'InGen Technologies',
        'Nakatomi Corp', 'Virtucon', 'Vandelay Industries', 'Prestige Worldwide',
        'Goliath National Bank', 'Penguin Publishing Tech', 'Atlas Solutions',
        'Meridian Labs', 'Nexus Digital', 'Apex Systems', 'Vortex Technologies',
        'Quantum Leap Ltd', 'Horizon Group', 'Pinnacle Software', 'Vertex Analytics',
        'Ember Studios', 'Cobalt Engineering', 'Prism Digital', 'Lattice Technologies',
        'Nova Platforms', 'Orbit Systems', 'Cascade Software', 'Summit Tech',
        'Forge Labs', 'Pulsar Inc', 'Cipher Works', 'Loop Technologies',
    ];

    private static array $locations = [
        'London, UK', 'Manchester, UK', 'Birmingham, UK', 'Edinburgh, UK',
        'Bristol, UK', 'Leeds, UK', 'Glasgow, UK', 'Liverpool, UK',
        'Sheffield, UK', 'Cardiff, UK', 'Oxford, UK', 'Cambridge, UK',
        'New York, US', 'San Francisco, US', 'Austin, US', 'Seattle, US',
        'Boston, US', 'Chicago, US', 'Los Angeles, US', 'Denver, US',
        'Berlin, DE', 'Amsterdam, NL', 'Paris, FR', 'Stockholm, SE',
        'Dublin, IE', 'Lisbon, PT', 'Barcelona, ES', 'Warsaw, PL',
        'Toronto, CA', 'Vancouver, CA', 'Sydney, AU', 'Melbourne, AU',
        'Remote',
    ];

    public function definition(): array
    {
        $salaryMin = $this->faker->numberBetween(2, 12) * 5000;
        $salaryMax = $salaryMin + $this->faker->numberBetween(1, 6) * 5000;

        $location = $this->faker->randomElement(self::$locations);

        return [
            'title'       => $this->faker->randomElement(self::$titles),
            'company'     => $this->faker->randomElement(self::$companies),
            'location'    => $location,
            'salary_min'  => $salaryMin,
            'salary_max'  => $salaryMax,
            'type'        => $this->faker->randomElement(['full-time', 'part-time', 'contract', 'freelance']),
            'description' => $this->faker->paragraphs(3, true),
        ];
    }
}
