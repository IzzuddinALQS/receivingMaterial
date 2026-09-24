<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class QualityInspection extends Model
{
    protected $fillable = [
        'lhp_number',
        'version_number',
        'goods_receipt_id',
        'inspected_by',
        'inspection_date',
        'qty_surat_jalan',
        'qty_ok',
        'head_quality_approval',
        'approved_by',
        'approved_at',
    ];

    protected function casts(): array
    {
        return [
            'version_number' => 'integer',
            'inspection_date' => 'date',
            'qty_surat_jalan' => 'decimal:3',
            'qty_ok' => 'decimal:3',
            'head_quality_approval' => 'boolean',
            'approved_at' => 'datetime',
        ];
    }

    public function goodsReceipt(): BelongsTo
    {
        return $this->belongsTo(
            GoodsReceipt::class,
            'goods_receipt_id'
        );
    }

    public function inspectedBy(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'inspected_by'
        );
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'approved_by'
        );
    }
}
