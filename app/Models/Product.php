<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'product_code',
        'name',
        'description',
        'category_id',
        'primary_uom_id',
        'minimum_stock',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'minimum_stock' => 'decimal:3',
            'is_active' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function primaryUom(): BelongsTo
    {
        return $this->belongsTo(
            Uom::class,
            'primary_uom_id'
        );
    }

    public function goodsReceiptDetails(): HasMany
    {
        return $this->hasMany(
            GoodsReceiptDetail::class,
            'product_id'
        );
    }

    public function purchaseOrderDetails(): HasMany
    {
        return $this->hasMany(
            PurchaseOrderDetail::class,
            'product_id'
        );
    }
}
