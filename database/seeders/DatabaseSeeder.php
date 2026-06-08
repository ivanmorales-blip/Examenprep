<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use App\Models\Missatge;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * php artisan migrate:fresh --seed
     */
public function run(): void
{
    $this->call([
        EventSeeder::class,
    ]);


    $user = User::factory()->create([
        'name' => 'Test User',
        'email' => 'test@example.com',
    ]);

    $user2 = User::factory()->create([
        'name' => 'Test User2',
        'email' => 'test@example2.com',
    ]);

    $user3 = User::factory()->create([
        'name' => 'Olga',
        'email' => 'olga@olga.com',
    ]);

    Missatge::firstOrCreate([
        'remitente_id' => $user->id,
        'destinatario_id' => $user->id,
        'asunto' => "Test",
        'mensaje' => "Hola",
        'leido' => False,
    ]);

    $project = Project::firstOrCreate([
        'name' => 'Test',
        'descripcio' => 'Test',
        'fecha_inicio' => now(),
        'fecha_fin' => now(),
        'user_id' => $user->id,
    ]);

    Task::firstOrCreate([
        'descripcio' => 'Test Task 1',
        'completada' => 1,
        'id_project' => $project->id,
    ]);

    Task::firstOrCreate([
        'descripcio' => 'Test Task 2',
        'completada' => 1,
        'id_project' => $project->id,
    ]);
}
}