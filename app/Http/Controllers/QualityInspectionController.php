<?php

namespace App\Http\Controllers;

use App\Models\GoodsReceipt;
use App\Models\QualityInspection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QualityInspectionController extends Controller
{
    public function create(GoodsReceipt $goodsReceipt): Response
    {
        if ($goodsReceipt->status !== 'waiting_qc') {
            abort(
                403,
                'FPB belum berada pada tahap pemeriksaan Quality.'
            );
        }

        $goodsReceipt->load([
            'supplier',
            'purchaseOrder',
            'details.product',
            'details.uom',
            'details.locator',
        ]);

        return Inertia::render('QualityInspections/Create', [
            'goodsReceipt' => $goodsReceipt,
        ]);
    }

    public function store(
        Request $request,
        GoodsReceipt $goodsReceipt
    ): RedirectResponse {
        if ($goodsReceipt->status !== 'waiting_qc') {
            abort(
                403,
                'FPB belum berada pada tahap pemeriksaan Quality.'
            );
        }

        $validated = $request->validate([
            'lhp_number' => [
                'required',
                'string',
                'max:255',
                'unique:quality_inspections,lhp_number',
            ],
            'inspection_date' => [
                'required',
                'date',
            ],
            'qty_surat_jalan' => [
                'required',
                'numeric',
                'min:0',
            ],
            'qty_ok' => [
                'required',
                'numeric',
                'min:0',
                'lte:qty_surat_jalan',
            ],
        ]);

        QualityInspection::create([
            'lhp_number' => $validated['lhp_number'],
            'version_number' => 1,
            'goods_receipt_id' => $goodsReceipt->id,
            'inspected_by' => $request->user()->id,
            'inspection_date' => $validated['inspection_date'],
            'qty_surat_jalan' => $validated['qty_surat_jalan'],
            'qty_ok' => $validated['qty_ok'],
            'head_quality_approval' => false,
        ]);

        return redirect()
            ->route('goods-receipts.show', $goodsReceipt)
            ->with(
                'success',
                'LHP berhasil dibuat dan menunggu persetujuan Head Quality.'
            );
    }
}
