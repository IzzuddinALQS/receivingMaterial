<?php

namespace App\Http\Controllers;

use App\Models\IncomingGood;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IncomingGoodController extends Controller
{
    /**
     * Menampilkan semua data barang masuk.
     */
    public function index(): Response
    {
        $incomingGoods = IncomingGood::latest()->paginate(10);

        return Inertia::render('IncomingGoods/Index', [
            'incomingGoods' => $incomingGoods,
        ]);
    }

    /**
     * Menampilkan form tambah barang.
     */
    public function create(): Response
    {
        return Inertia::render('IncomingGoods/Create');
    }

    /**
     * Menyimpan barang baru.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'item_name' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'integer', 'min:1'],
            'supplier' => ['required', 'string', 'max:255'],
            'received_date' => ['required', 'date'],
            'description' => ['nullable', 'string'],
        ]);

        $incomingGood =IncomingGood::create($validated);

        return redirect()
            ->route('incoming-goods.index')
            ->with('success', $incomingGood->item_name . ' berhasil ditambahkan.');
    }

    /**
     * Menampilkan detail satu barang.
     */
    public function show(IncomingGood $incomingGood): Response
    {
        return Inertia::render('IncomingGoods/Show', [
            'incomingGood' => $incomingGood,
        ]);
    }

    /**
     * Menampilkan form edit barang.
     */
    public function edit(IncomingGood $incomingGood): Response
    {
        return Inertia::render('IncomingGoods/Edit', [
            'incomingGood' => $incomingGood,
        ]);
    }

    /**
     * Memperbarui barang.
     */
    public function update(
        Request $request,
        IncomingGood $incomingGood
    ): RedirectResponse {
        $validated = $request->validate([
            'item_name' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'integer', 'min:1'],
            'supplier' => ['required', 'string', 'max:255'],
            'received_date' => ['required', 'date'],
            'description' => ['nullable', 'string'],
        ]);

        $incomingGood->update($validated);

        return redirect()
            ->route('incoming-goods.index')
            ->with('success', $incomingGood->item_name . ' berhasil diperbarui.');
    }

    /**
     * Menghapus barang.
     */
    public function destroy(IncomingGood $incomingGood): RedirectResponse
    {
        $incomingGood->delete();

        return redirect()
            ->route('incoming-goods.index')
            ->with('success', $incomingGood->item_name . ' berhasil dihapus.');
    }
}
