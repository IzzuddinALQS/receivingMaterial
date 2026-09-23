<?php

namespace App\Http\Controllers;

use App\Models\GoodsReceipt;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class GoodsReceiptController extends Controller
{
    public function index(): Response
    {
        $goodsReceipts = GoodsReceipt::with([
            'supplier',
            'details.product',
        ])
            ->latest()
            ->paginate(10);

        return Inertia::render('GoodsReceipts/Index', [
            'goodsReceipts' => $goodsReceipts,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('GoodsReceipts/Create', [
            'suppliers' => Supplier::orderBy('name')->get([
                'id',
                'name',
            ]),

            'products' => Product::orderBy('name')->get([
                'id',
                'name',
            ]),
        ]);
    }

    public function edit(GoodsReceipt $goodsReceipt): Response
    {
        $goodsReceipt->load('details.product');

        return Inertia::render('GoodsReceipts/Edit', [
            'goodsReceipt' => $goodsReceipt,

            'suppliers' => Supplier::orderBy('name')->get([
                'id',
                'name',
            ]),

            'products' => Product::orderBy('name')->get([
                'id',
                'name',
            ]),
        ]);
    }

    public function update(
        Request $request,
        GoodsReceipt $goodsReceipt
    ): RedirectResponse {
        $validated = $request->validate([
            'goods_receipt_no' => [
                'required',
                'string',
                'max:255',
                'unique:goods_receipts,goods_receipt_no,' . $goodsReceipt->id,
            ],

            'supplier_id' => [
                'required',
                'exists:suppliers,id',
            ],

            'received_date' => [
                'required',
                'date',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'details' => [
                'required',
                'array',
                'min:1',
            ],

            'details.*.id' => [
                'nullable',
                'exists:goods_receipt_details,id',
            ],

            'details.*.product_id' => [
                'required',
                'exists:products,id',
            ],

            'details.*.quantity' => [
                'required',
                'integer',
                'min:1',
            ],
        ]);

        DB::transaction(function () use ($validated, $goodsReceipt) {

            // Update header
            $goodsReceipt->update([
                'goods_receipt_no' => $validated['goods_receipt_no'],
                'supplier_id' => $validated['supplier_id'],
                'received_date' => $validated['received_date'],
                'description' => $validated['description'] ?? null,
            ]);

            // Hapus semua detail lama
            $goodsReceipt->details()->delete();

            // Buat kembali detail berdasarkan data terbaru
            foreach ($validated['details'] as $detail) {
                $goodsReceipt->details()->create([
                    'product_id' => $detail['product_id'],
                    'quantity' => $detail['quantity'],
                ]);
            }
        });

        return redirect()
            ->route('goods-receipts.index')
            ->with('success', 'Goods Receipt berhasil diperbarui.');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'goods_receipt_no' => ['required', 'string', 'max:255', 'unique:goods_receipts,goods_receipt_no'],
            'supplier_id' => ['required', 'exists:suppliers,id'],
            'received_date' => ['required', 'date'],
            'description' => ['nullable', 'string'],

            'details' => ['required', 'array', 'min:1'],

            'details.*.product_id' => [
                'required',
                'exists:products,id',
            ],

            'details.*.quantity' => [
                'required',
                'integer',
                'min:1',
            ],
        ]);

        DB::transaction(function () use ($validated) {

            $goodsReceipt = GoodsReceipt::create([
                'goods_receipt_no' => $validated['goods_receipt_no'],
                'supplier_id' => $validated['supplier_id'],
                'received_date' => $validated['received_date'],
                'description' => $validated['description'] ?? null,
            ]);

            foreach ($validated['details'] as $detail) {
                $goodsReceipt->details()->create([
                    'product_id' => $detail['product_id'],
                    'quantity' => $detail['quantity'],
                ]);
            }
        });

        return redirect()
            ->route('goods-receipts.index')
            ->with('success', 'Goods Receipt berhasil ditambahkan.');
    }

    public function show(GoodsReceipt $goodsReceipt): Response
    {
        $goodsReceipt->load([
            'supplier',
            'details.product',
        ]);

        return Inertia::render('GoodsReceipts/Show', [
            'goodsReceipt' => $goodsReceipt,
        ]);
    }

    public function destroy(
        GoodsReceipt $goodsReceipt
    ): RedirectResponse {
        $goodsReceipt->delete();

        return redirect()
            ->route('goods-receipts.index')
            ->with('success', 'Goods Receipt berhasil dihapus.');
    }
}
