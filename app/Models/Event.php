<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public function registrations()
{
    return $this->hasMany(Registration::class);
}
}


