<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $oldGoods = DB::table('incoming_goods')->get();

        foreach ($oldGoods as $oldGood) {

            // 1. Cari atau buat supplier
            $supplierId = DB::table('suppliers')
                ->where('name', $oldGood->supplier)
                ->value('id');

            if (!$supplierId) {
                $supplierId = DB::table('suppliers')->insertGetId([
                    'supplier_code' => 'SUP-' . str_pad(
                        DB::table('suppliers')->count() + 1,
                        4,
                        '0',
                        STR_PAD_LEFT
                    ),
                    'name' => $oldGood->supplier,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // 2. Cari atau buat product
            $productId = DB::table('products')
                ->where('name', $oldGood->item_name)
                ->value('id');

            if (!$productId) {
                $productId = DB::table('products')->insertGetId([
                    'product_code' => 'PRD-' . str_pad(
                        DB::table('products')->count() + 1,
                        4,
                        '0',
                        STR_PAD_LEFT
                    ),
                    'name' => $oldGood->item_name,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // 3. Buat Goods Receipt
            $goodsReceiptId = DB::table('goods_receipts')->insertGetId([
                'goods_receipt_no' => 'GR-LEGACY-' . str_pad(
                    $oldGood->id,
                    6,
                    '0',
                    STR_PAD_LEFT
                ),
                'supplier_id' => $supplierId,
                'received_date' => $oldGood->received_date,
                'description' => $oldGood->description,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // 4. Buat detail Goods Receipt
            DB::table('goods_receipt_details')->insert([
                'goods_receipt_id' => $goodsReceiptId,
                'product_id' => $productId,
                'quantity' => $oldGood->quantity,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        DB::table('goods_receipt_details')
            ->whereIn(
                'goods_receipt_id',
                DB::table('goods_receipts')
                    ->where('goods_receipt_no', 'like', 'GR-LEGACY-%')
                    ->pluck('id')
            )
            ->delete();

        DB::table('goods_receipts')
            ->where('goods_receipt_no', 'like', 'GR-LEGACY-%')
            ->delete();
    }
};
