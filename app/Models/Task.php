<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'descripcio',
        'completada',
        'project_id',
    ];

        public function event()
{
    return $this->belongsTo(Project::class);
}
}