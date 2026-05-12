<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = [
        'name',
        'email',
        'event_id',
        'document'
    ];

        public function event()
{
    return $this->belongsTo(Event::class);
}
}