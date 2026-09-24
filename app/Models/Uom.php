<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Uom extends Model
{
    protected $fillable = ['code', 'name',];
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'primary_uom_id');
    }
    public function purchaseOrderDetails(): HasMany
    {
        return $this->hasMany(PurchaseOrderDetail::class, 'uom_id');
    }
    public function goodsReceiptDetails(): HasMany
    {
        return $this->hasMany(GoodsReceiptDetail::class, 'uom_id');
    }
}
