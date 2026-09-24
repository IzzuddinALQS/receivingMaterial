<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GoodsReceiptDetail extends Model
{
    protected $fillable = [
        'goods_receipt_id',
        'product_id',
        'batch_number',
        'mfg_date',
        'exp_date',
        'quantity',
        'uom_id',
        'locator_id',
        'description',
    ];

    protected $casts = [
        'mfg_date' => 'date',
        'exp_date' => 'date',
    ];

    public function goodsReceipt(): BelongsTo
    {
        return $this->belongsTo(GoodsReceipt::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function uom(): BelongsTo
    {
        return $this->belongsTo(Uom::class);
    }

    public function locator(): BelongsTo
    {
        return $this->belongsTo(Locater::class);
    }
}
