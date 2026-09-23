<?php

use App\Http\Controllers\GoodsReceiptController;
use App\Http\Controllers\IncomingGoodController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('incoming-goods', IncomingGoodController::class);
    Route::resource('goods-receipts', GoodsReceiptController::class);

    Route::middleware('admin')->group(function () {
        Route::get('/admin', function () {
            return Inertia::render('Admin/Index');
        })->name('admin.index');

        Route::resource('admin/users', UserController::class)
            ->names('admin.users');

        Route::resource('admin/suppliers', SupplierController::class)
            ->names('admin.suppliers');

        Route::resource('admin/products', ProductController::class)
            ->names('admin.products');
    });
});

require __DIR__ . '/auth.php';
