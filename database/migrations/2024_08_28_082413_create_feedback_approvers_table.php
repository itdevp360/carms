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
        Schema::create('feedback_approvers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_form_id')->constrained('car_form_processors');
            $table->string('element_type');
            $table->longText('feedback');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback_approvers');
    }
};
