<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('goods_receipts', function (Blueprint $table) {
            $table->renameColumn('goods_receipt_no', 'fpb_number');

            $table->foreignId('purchase_order_id')
                ->nullable()
                ->after('fpb_number')
                ->constrained('purchase_orders')
                ->restrictOnDelete();

            $table->foreignId('received_by')
                ->nullable()
                ->after('received_date')
                ->constrained('users')
                ->restrictOnDelete();

            $table->string('surat_jalan_file')
                ->nullable()
                ->after('received_by');

            $table->string('coa_file')
                ->nullable()
                ->after('surat_jalan_file');

            $table->string('status')
                ->default('draft')
                ->after('coa_file');

            $table->foreignId('verified_by')
                ->nullable()
                ->after('status')
                ->constrained('users')
                ->restrictOnDelete();

            $table->timestamp('verified_at')
                ->nullable()
                ->after('verified_by');

            $table->text('verification_notes')
                ->nullable()
                ->after('verified_at');
        });
    }

    public function down(): void
    {
        Schema::table('goods_receipts', function (Blueprint $table) {
            $table->dropForeign(['purchase_order_id']);
            $table->dropForeign(['received_by']);
            $table->dropForeign(['verified_by']);

            $table->dropColumn([
                'purchase_order_id',
                'received_by',
                'surat_jalan_file',
                'coa_file',
                'status',
                'verified_by',
                'verified_at',
                'verification_notes',
            ]);

            $table->renameColumn('fpb_number', 'goods_receipt_no');
        });
    }
};
