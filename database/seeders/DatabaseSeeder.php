<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name'              => 'Admin',
                'password'          => bcrypt('password'),
                'is_admin'          => true,
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            JobListingSeeder::class,
        ]);
    }
}
