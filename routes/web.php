<?php

use App\Http\Controllers\GoodsReceiptController;
use App\Http\Controllers\IncomingGoodController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QualityInspectionController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $totalGoodsReceipts = \App\Models\GoodsReceipt::count();

    $totalSuppliers = \App\Models\Supplier::count();

    $totalProducts = \App\Models\Product::count();

    $totalQuantity = \App\Models\GoodsReceiptDetail::sum('quantity');

    $latestGoodsReceipts = \App\Models\GoodsReceipt::with([
        'supplier',
        'details',
    ])
        ->latest('received_date')
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
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');


    /*
    |--------------------------------------------------------------------------
    | Incoming Goods
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'incoming-goods',
        IncomingGoodController::class
    );


    /*
    |--------------------------------------------------------------------------
    | Goods Receipts / FPB
    |--------------------------------------------------------------------------
    */

    Route::post(
        'goods-receipts/{goods_receipt}/submit',
        [GoodsReceiptController::class, 'submit']
    )->name('goods-receipts.submit');

    Route::post(
        'goods-receipts/{goods_receipt}/verify',
        [GoodsReceiptController::class, 'verify']
    )->name('goods-receipts.verify');

    Route::post(
        'goods-receipts/{goods_receipt}/send-to-qc',
        [GoodsReceiptController::class, 'sendToQc']
    )->name('goods-receipts.send-to-qc');

    Route::resource(
        'goods-receipts',
        GoodsReceiptController::class
    );

    Route::get(
        'goods-receipts/{goods_receipt}/quality-inspection/create',
        [QualityInspectionController::class, 'create']
    )->name('quality-inspections.create');

    Route::post(
        'goods-receipts/{goods_receipt}/quality-inspection',
        [QualityInspectionController::class, 'store']
    )->name('quality-inspections.store');
});

require __DIR__ . '/auth.php';
