<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupplierCategory extends Model
{
    protected $fillable = ['supplier_id', 'category_id',];
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
