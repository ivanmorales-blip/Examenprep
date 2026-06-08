<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Missatge extends Model
{
    protected $fillable = [
        'remitente_id',
        'destinatario_id',
        'asunto',
        'mensaje',
        'leido',
    ];


public function user()
{
    return $this->belongsTo(User::class);
}
}