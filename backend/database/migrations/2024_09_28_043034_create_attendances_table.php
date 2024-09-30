<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('outlet_id')->constrained()->onDelete('cascade');
            $table->string('before_img');
            $table->string('after_img');
            $table->timestamps(); // Automatically handles created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('attendances');
    }
};
