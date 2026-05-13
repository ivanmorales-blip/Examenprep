<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
    $table->id();

    $table->string('name', 100);
    $table->text('descripcio');

    $table->date('fecha_inicio');
    $table->text('fecha_fin');
    $table->unsignedBigInteger('user_id');
    $table->foreign('user_id')
        ->references('id')
        ->on('users')
        ->onDelete('cascade');

    $table->timestamps();
});
    }

};
