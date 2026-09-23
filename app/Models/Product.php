<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'product_code',
        'name',
        'description',
    ];

    public function goodsReceiptDetails(): HasMany
    {
        return $this->hasMany(GoodsReceiptDetail::class);
    }
}
