<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{

    public function run(): void
    {
        DB::table('events')->insert([
            [
                'name' => 'Laravel Conference',
                'date' => '2026-06-15',
                'short_description' => 'A conference about Laravel and modern web development.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'React Workshop',
                'date' => '2026-07-01',
                'short_description' => 'Hands-on React workshop for beginners.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hackathon Barcelona',
                'date' => '2026-08-20',
                'short_description' => '24-hour coding competition and networking event.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}