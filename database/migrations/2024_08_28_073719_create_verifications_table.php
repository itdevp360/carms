<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('verifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_form_id')->constrained('car_form_processors');
            $table->integer('verification_stage');
            $table->string('status');
            $table->foreignId('person_responsible_id')->constrained('users');
            $table->foreignId('creator_id')->constrained('users');
            $table->foreignId('approver_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verifications');
    }
};
