<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('goods_receipt_details', function (Blueprint $table) {
            $table->string('batch_number')
                ->nullable()
                ->after('product_id');

            $table->date('mfg_date')
                ->nullable()
                ->after('batch_number');

            $table->date('exp_date')
                ->nullable()
                ->after('mfg_date');

            $table->foreignId('uom_id')
                ->nullable()
                ->after('quantity')
                ->constrained('uoms')
                ->restrictOnDelete();

            $table->foreignId('locator_id')
                ->nullable()
                ->after('uom_id')
                ->constrained('locaters')
                ->restrictOnDelete();

            $table->text('description')
                ->nullable()
                ->after('locator_id');
        });
    }

    public function down(): void
    {
        Schema::table('goods_receipt_details', function (Blueprint $table) {
            $table->dropForeign(['uom_id']);
            $table->dropForeign(['locator_id']);

            $table->dropColumn([
                'batch_number',
                'mfg_date',
                'exp_date',
                'uom_id',
                'locator_id',
                'description',
            ]);
        });
    }
};
