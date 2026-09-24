<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('category_id')
                ->nullable()
                ->after('name')
                ->constrained('categories')
                ->restrictOnDelete();

            $table->foreignId('primary_uom_id')
                ->nullable()
                ->after('category_id')
                ->constrained('uoms')
                ->restrictOnDelete();

            $table->decimal('minimum_stock', 15, 3)
                ->default(0)
                ->after('primary_uom_id');

            $table->boolean('is_active')
                ->default(true)
                ->after('minimum_stock');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropForeign(['primary_uom_id']);

            $table->dropColumn([
                'category_id',
                'primary_uom_id',
                'minimum_stock',
                'is_active',
            ]);
        });
    }
};

