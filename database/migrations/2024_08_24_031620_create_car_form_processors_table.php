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
        Schema::create('car_form_processors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('car_form_number');
            $table->string('issue_type');
            $table->string('source');
            $table->string('nonconformance_classification');
            $table->longText('nonconformance_observation');
            $table->string('auditor_initiator');
            $table->date('date_reported_to_ims');
            $table->string('concerned_department');
            $table->string('status');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('approver_id')->constrained('users');
            $table->foreignId('receiver_id')->constrained('users');
            $table->string('email_receiver');
            $table->foreignId('department_head_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_form_processors');
    }
};
