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
        Schema::create('classifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_form_id')->constrained('car_form_processors');
            $table->integer('stage');
            $table->text('risk');
            $table->text('weakness');
            $table->text('threat')->nullable();
            $table->text('p');
            $table->text('s');
            $table->text('r');
            $table->text('classification');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classifications');
    }
};
