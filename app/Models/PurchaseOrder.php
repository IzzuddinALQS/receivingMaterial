<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PurchaseOrder extends Model
{
    protected $fillable = [
        'po_number',
        'supplier_id',
        'po_date',
        'status',
        'last_sync_at',
        'is_revised_flag',
        'source_snapshot',
    ];

    protected function casts(): array
    {
        return [
            'po_date' => 'date',
            'last_sync_at' => 'datetime',
            'is_revised_flag' => 'boolean',
            'source_snapshot' => 'array',
        ];
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function details(): HasMany
    {
        return $this->hasMany(
            PurchaseOrderDetail::class,
            'purchase_order_id'
        );
    }

    public function goodsReceipts(): HasMany
    {
        return $this->hasMany(
            GoodsReceipt::class,
            'purchase_order_id'
        );
    }
}
