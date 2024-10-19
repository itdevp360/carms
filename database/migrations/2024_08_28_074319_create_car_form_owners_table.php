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
        Schema::create('car_form_owners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_form_id')->constrained('car_form_processors');
            $table->longText('correction')->nullable();
            $table->date('date_correction')->nullable();
            $table->longText('consequence')->nullable();
            $table->longText('deal_consequence')->nullable();
            $table->date('date_deal_consequence')->nullable();
            $table->longText('corrective_action')->nullable();
            $table->date('date_corrective_action')->nullable();
            $table->string('similar_nonconformity')->nullable();
            $table->string('potential_nonconformity')->nullable();
            $table->date('date_potential_nonconformity')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_form_owners');
    }
};
