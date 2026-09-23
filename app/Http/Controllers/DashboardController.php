<?php

namespace App\Http\Controllers;

use App\Models\GoodsReceipt;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Menampilkan dashboard utama.
     */
    public function index(Request $request): Response
    {
        $totalGoodsReceipts = GoodsReceipt::count();

        $totalSuppliers = Supplier::count();

        $totalProducts = Product::count();

        $totalQuantity = GoodsReceipt::with('details')
            ->get()
            ->sum(function ($goodsReceipt) {
                return $goodsReceipt->details->sum('quantity');
            });

        $latestGoodsReceipts = GoodsReceipt::with([
            'supplier',
            'details.product',
        ])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'statistics' => [
                'totalGoodsReceipts' => $totalGoodsReceipts,
                'totalSuppliers' => $totalSuppliers,
                'totalProducts' => $totalProducts,
                'totalQuantity' => $totalQuantity,
            ],

            'latestGoodsReceipts' => $latestGoodsReceipts,
        ]);
    }
}
