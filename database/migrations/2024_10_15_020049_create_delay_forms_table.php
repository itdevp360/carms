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
        Schema::create('delay_forms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_form_id')->constrained('car_form_processors');
            $table->integer('submission_delay');
            $table->integer('manager_approval_delay');
            $table->integer('ims_approval_delay');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delay_forms');
    }
};
