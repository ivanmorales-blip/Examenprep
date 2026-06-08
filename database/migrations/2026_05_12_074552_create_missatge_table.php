<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('missatges', function (Blueprint $table) {
    $table->id();

    $table->unsignedBigInteger('remitente_id');
    $table->foreign('remitente_id')->references('id')->on('users')->onDelete('cascade');
    $table->unsignedBigInteger('destinatario_id');
    $table->foreign('destinatario_id')->references('id')->on('users')->onDelete('cascade');
    
    $table->string('asunto', 100);
    $table->text('mensaje');
    $table->boolean('leido')->default(false);
    $table->timestamps();
});
    }

};
