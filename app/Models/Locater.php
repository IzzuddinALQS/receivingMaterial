<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Locater extends Model
{
    protected $fillable = [
        'code',
        'warehouse_name',
        'area_rack',
    ];

    public function goodsReceiptDetails(): HasMany
    {
        return $this->hasMany(
            GoodsReceiptDetail::class,
            'locator_id'
        );
    }
}
