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
        Schema::create('quality_inspections', function (Blueprint $table) {
            $table->id();

            $table->string('lhp_number')->unique();

            $table->unsignedInteger('version_number')->default(1);

            $table->foreignId('goods_receipt_id')
                ->constrained('goods_receipts')
                ->restrictOnDelete();

            $table->foreignId('inspected_by')
                ->nullable()
                ->constrained('users')
                ->restrictOnDelete();

            $table->date('inspection_date');

            $table->decimal('qty_surat_jalan', 15, 3);

            $table->decimal('qty_ok', 15, 3);

            $table->boolean('head_quality_approval')
                ->default(false);

            $table->foreignId('approved_by')
                ->nullable()
                ->constrained('users')
                ->restrictOnDelete();

            $table->timestamp('approved_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quality_inspections');
    }
};
