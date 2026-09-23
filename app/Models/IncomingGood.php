<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncomingGood extends Model
{
    protected $fillable = [
        'item_name',
        'quantity',
        'supplier',
        'received_date',
        'description',
    ];

    protected $casts = [
        'received_date' => 'date',
    ];
}
