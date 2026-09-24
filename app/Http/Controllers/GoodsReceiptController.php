<?php

namespace App\Http\Controllers;

use App\Models\GoodsReceipt;
use App\Models\Locater;
use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\Supplier;
use App\Models\Uom;
use App\Models\QualityInspection;
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
            'receivedBy',
            'details.product',
            'details.uom',
            'details.locator',
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

            'purchaseOrders' => PurchaseOrder::with('supplier')
                ->where('status', 'open')
                ->orderBy('po_number')
                ->get([
                    'id',
                    'po_number',
                    'supplier_id',
                    'po_date',
                    'status',
                ]),

            'products' => Product::where('is_active', true)
                ->orderBy('name')
                ->get([
                    'id',
                    'product_code',
                    'name',
                    'primary_uom_id',
                ]),

            'uoms' => Uom::orderBy('name')->get([
                'id',
                'code',
                'name',
            ]),

            'locaters' => Locater::orderBy('warehouse_name')
                ->orderBy('area_rack')
                ->get([
                    'id',
                    'code',
                    'warehouse_name',
                    'area_rack',
                ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'fpb_number' => [
                'required',
                'string',
                'max:255',
                'unique:goods_receipts,fpb_number',
            ],

            'purchase_order_id' => [
                'required',
                'exists:purchase_orders,id',
            ],

            'supplier_id' => [
                'required',
                'exists:suppliers,id',
            ],

            'received_date' => [
                'required',
                'date',
            ],

            'received_by' => [
                'nullable',
                'exists:users,id',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'surat_jalan_file' => [
                'nullable',
                'file',
                'max:5120',
            ],

            'coa_file' => [
                'nullable',
                'file',
                'max:5120',
            ],

            'details' => [
                'required',
                'array',
                'min:1',
            ],

            'details.*.product_id' => [
                'required',
                'exists:products,id',
            ],

            'details.*.batch_number' => [
                'nullable',
                'string',
                'max:255',
            ],

            'details.*.mfg_date' => [
                'nullable',
                'date',
            ],

            'details.*.exp_date' => [
                'nullable',
                'date',
            ],

            'details.*.quantity' => [
                'required',
                'numeric',
                'min:0.001',
            ],

            'details.*.uom_id' => [
                'nullable',
                'exists:uoms,id',
            ],

            'details.*.locator_id' => [
                'nullable',
                'exists:locaters,id',
            ],

            'details.*.description' => [
                'nullable',
                'string',
            ],
        ]);

        DB::transaction(function () use ($request, $validated) {
            $suratJalanPath = null;
            $coaPath = null;

            if ($request->hasFile('surat_jalan_file')) {
                $suratJalanPath = $request
                    ->file('surat_jalan_file')
                    ->store(
                        'goods-receipts/surat-jalan',
                        'public'
                    );
            }

            if ($request->hasFile('coa_file')) {
                $coaPath = $request
                    ->file('coa_file')
                    ->store(
                        'goods-receipts/coa',
                        'public'
                    );
            }

            $goodsReceipt = GoodsReceipt::create([
                'fpb_number' => $validated['fpb_number'],
                'purchase_order_id' => $validated['purchase_order_id'],
                'supplier_id' => $validated['supplier_id'],
                'received_date' => $validated['received_date'],
                'received_by' => $validated['received_by'] ?? auth()->id(),
                'description' => $validated['description'] ?? null,
                'surat_jalan_file' => $suratJalanPath,
                'coa_file' => $coaPath,
                'status' => 'draft',
            ]);

            foreach ($validated['details'] as $detail) {
                $goodsReceipt->details()->create([
                    'product_id' => $detail['product_id'],
                    'batch_number' => $detail['batch_number'] ?? null,
                    'mfg_date' => $detail['mfg_date'] ?? null,
                    'exp_date' => $detail['exp_date'] ?? null,
                    'quantity' => $detail['quantity'],
                    'uom_id' => $detail['uom_id'] ?? null,
                    'locator_id' => $detail['locator_id'] ?? null,
                    'description' => $detail['description'] ?? null,
                ]);
            }
        });

        return redirect()
            ->route('goods-receipts.index')
            ->with('success', 'FPB berhasil ditambahkan.');
    }

    public function show(GoodsReceipt $goodsReceipt): Response
    {
        $goodsReceipt->load([
            'supplier',
            'receivedBy',
            'verifiedBy',
            'details.product',
            'details.uom',
            'details.locator',
        ]);

        $qualityInspections = QualityInspection::with([
            'inspectedBy',
            'approvedBy',
        ])
            ->where('goods_receipt_id', $goodsReceipt->id)
            ->latest()
            ->get();

        return Inertia::render('GoodsReceipts/Show', [
            'goodsReceipt' => $goodsReceipt,
            'qualityInspections' => $qualityInspections,
        ]);
    }

    public function edit(GoodsReceipt $goodsReceipt): Response
    {
        if ($goodsReceipt->status !== 'draft') {
            abort(
                403,
                'FPB yang sudah disubmit tidak dapat diedit.'
            );
        }

        $goodsReceipt->load([
            'details.product',
            'details.uom',
            'details.locator',
        ]);

        return Inertia::render('GoodsReceipts/Edit', [
            'goodsReceipt' => $goodsReceipt,

            'suppliers' => Supplier::orderBy('name')->get([
                'id',
                'name',
            ]),

            'purchaseOrders' => PurchaseOrder::with('supplier')
                ->where('status', 'open')
                ->orderBy('po_number')
                ->get([
                    'id',
                    'po_number',
                    'supplier_id',
                    'po_date',
                    'status',
                ]),

            'products' => Product::where('is_active', true)
                ->orderBy('name')
                ->get([
                    'id',
                    'product_code',
                    'name',
                    'primary_uom_id',
                ]),

            'uoms' => Uom::orderBy('name')->get([
                'id',
                'code',
                'name',
            ]),

            'locaters' => Locater::orderBy('warehouse_name')
                ->orderBy('area_rack')
                ->get([
                    'id',
                    'code',
                    'warehouse_name',
                    'area_rack',
                ]),
        ]);
    }

    public function update(
        Request $request,
        GoodsReceipt $goodsReceipt
    ): RedirectResponse {
        if ($goodsReceipt->status !== 'draft') {
            return redirect()
                ->back()
                ->with(
                    'error',
                    'FPB yang sudah disubmit tidak dapat diedit.'
                );
        }

        $validated = $request->validate([
            'fpb_number' => [
                'required',
                'string',
                'max:255',
                'unique:goods_receipts,fpb_number,' . $goodsReceipt->id,
            ],

            'purchase_order_id' => [
                'required',
                'exists:purchase_orders,id',
            ],

            'supplier_id' => [
                'required',
                'exists:suppliers,id',
            ],

            'received_date' => [
                'required',
                'date',
            ],

            'received_by' => [
                'nullable',
                'exists:users,id',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'surat_jalan_file' => [
                'nullable',
                'file',
                'max:5120',
            ],

            'coa_file' => [
                'nullable',
                'file',
                'max:5120',
            ],

            'details' => [
                'required',
                'array',
                'min:1',
            ],

            'details.*.product_id' => [
                'required',
                'exists:products,id',
            ],

            'details.*.batch_number' => [
                'nullable',
                'string',
                'max:255',
            ],

            'details.*.mfg_date' => [
                'nullable',
                'date',
            ],

            'details.*.exp_date' => [
                'nullable',
                'date',
            ],

            'details.*.quantity' => [
                'required',
                'numeric',
                'min:0.001',
            ],

            'details.*.uom_id' => [
                'nullable',
                'exists:uoms,id',
            ],

            'details.*.locator_id' => [
                'nullable',
                'exists:locaters,id',
            ],

            'details.*.description' => [
                'nullable',
                'string',
            ],
        ]);

        DB::transaction(function () use (
            $request,
            $validated,
            $goodsReceipt
        ) {
            $goodsReceipt->update([
                'fpb_number' => $validated['fpb_number'],
                'purchase_order_id' => $validated['purchase_order_id'],
                'supplier_id' => $validated['supplier_id'],
                'received_date' => $validated['received_date'],
                'received_by' =>
                $validated['received_by'] ??
                    $goodsReceipt->received_by,
                'description' =>
                $validated['description'] ?? null,
            ]);

            if ($request->hasFile('surat_jalan_file')) {
                $goodsReceipt->update([
                    'surat_jalan_file' => $request
                        ->file('surat_jalan_file')
                        ->store(
                            'goods-receipts/surat-jalan',
                            'public'
                        ),
                ]);
            }

            if ($request->hasFile('coa_file')) {
                $goodsReceipt->update([
                    'coa_file' => $request
                        ->file('coa_file')
                        ->store(
                            'goods-receipts/coa',
                            'public'
                        ),
                ]);
            }

            $goodsReceipt->details()->delete();

            foreach ($validated['details'] as $detail) {
                $goodsReceipt->details()->create([
                    'product_id' => $detail['product_id'],
                    'batch_number' =>
                    $detail['batch_number'] ?? null,
                    'mfg_date' =>
                    $detail['mfg_date'] ?? null,
                    'exp_date' =>
                    $detail['exp_date'] ?? null,
                    'quantity' => $detail['quantity'],
                    'uom_id' =>
                    $detail['uom_id'] ?? null,
                    'locator_id' =>
                    $detail['locator_id'] ?? null,
                    'description' =>
                    $detail['description'] ?? null,
                ]);
            }
        });

        return redirect()
            ->route('goods-receipts.index')
            ->with('success', 'FPB berhasil diperbarui.');
    }

    public function submit(
        GoodsReceipt $goodsReceipt
    ): RedirectResponse {
        if ($goodsReceipt->status !== 'draft') {
            return redirect()
                ->back()
                ->with(
                    'error',
                    'FPB hanya dapat disubmit jika berstatus draft.'
                );
        }

        $goodsReceipt->update([
            'status' => 'waiting_verification',
        ]);

        return redirect()
            ->route('goods-receipts.index')
            ->with(
                'success',
                'FPB berhasil disubmit dan menunggu verifikasi.'
            );
    }

    public function verify(Request $request, GoodsReceipt $goodsReceipt): RedirectResponse
    {
        if ($goodsReceipt->status !== 'waiting_verification') {
            return redirect()
                ->back()
                ->with('error', 'FPB hanya dapat diverifikasi jika berstatus menunggu verifikasi.');
        }

        if (! $request->user()?->isAdmin() && $request->user()?->role !== 'supervisor') {
            abort(403, 'Anda tidak memiliki akses untuk memverifikasi FPB.');
        }

        $validated = $request->validate([
            'verification_notes' => ['nullable', 'string'],
        ]);

        $goodsReceipt->update([
            'status' => 'verified',
            'verified_by' => $request->user()->id,
            'verified_at' => now(),
            'verification_notes' => $validated['verification_notes'] ?? null,
        ]);

        return redirect()
            ->route('goods-receipts.show', $goodsReceipt)
            ->with('success', 'FPB berhasil diverifikasi.');
    }

    public function sendToQc(
        GoodsReceipt $goodsReceipt
    ): RedirectResponse {
        if ($goodsReceipt->status !== 'verified') {
            return redirect()
                ->back()
                ->with(
                    'error',
                    'FPB hanya dapat dikirim ke QC jika sudah terverifikasi.'
                );
        }

        $goodsReceipt->update([
            'status' => 'waiting_qc',
        ]);

        return redirect()
            ->route('goods-receipts.show', $goodsReceipt)
            ->with(
                'success',
                'FPB berhasil dikirim ke Quality untuk pemeriksaan.'
            );
    }

    public function destroy(
        GoodsReceipt $goodsReceipt
    ): RedirectResponse {
        if ($goodsReceipt->status !== 'draft') {
            return redirect()
                ->back()
                ->with(
                    'error',
                    'FPB yang sudah disubmit tidak dapat dihapus.'
                );
        }

        $goodsReceipt->delete();

        return redirect()
            ->route('goods-receipts.index')
            ->with(
                'success',
                'FPB berhasil dihapus.'
            );
    }
}
