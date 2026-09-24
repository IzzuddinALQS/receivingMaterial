import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, goodsReceipt }) {
    const { data, setData, post, processing, errors } = useForm({
        lhp_number: "",
        inspection_date: new Date().toISOString().split("T")[0],
        qty_surat_jalan: "",
        qty_ok: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("quality-inspections.store", goodsReceipt.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pemeriksaan Quality - LHP
                </h2>
            }
        >
            <Head title="Buat LHP" />

            <div className="py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {/* Informasi FPB */}
                    <div className="mb-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">
                            Informasi FPB
                        </h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Nomor FPB
                                </p>
                                <p className="font-medium text-gray-800">
                                    {goodsReceipt.fpb_number}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Supplier
                                </p>
                                <p className="font-medium text-gray-800">
                                    {goodsReceipt.supplier?.name ?? "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Tanggal Penerimaan
                                </p>
                                <p className="font-medium text-gray-800">
                                    {goodsReceipt.received_date ?? "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Purchase Order
                                </p>
                                <p className="font-medium text-gray-800">
                                    {goodsReceipt.purchase_order?.po_number ??
                                        "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Detail Barang */}
                    <div className="mb-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">
                            Detail Barang
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="text-left text-sm text-gray-500">
                                        <th className="px-3 py-3">Produk</th>
                                        <th className="px-3 py-3">Batch</th>
                                        <th className="px-3 py-3">MFG</th>
                                        <th className="px-3 py-3">EXP</th>
                                        <th className="px-3 py-3">Qty</th>
                                        <th className="px-3 py-3">UOM</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {goodsReceipt.details?.map((detail) => (
                                        <tr key={detail.id}>
                                            <td className="px-3 py-3">
                                                <div className="font-medium text-gray-800">
                                                    {detail.product?.name ??
                                                        "-"}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {detail.product
                                                        ?.product_code ??
                                                        detail.product?.code ??
                                                        "-"}
                                                </div>
                                            </td>

                                            <td className="px-3 py-3">
                                                {detail.batch_number ?? "-"}
                                            </td>

                                            <td className="px-3 py-3">
                                                {detail.mfg_date ?? "-"}
                                            </td>

                                            <td className="px-3 py-3">
                                                {detail.exp_date ?? "-"}
                                            </td>

                                            <td className="px-3 py-3">
                                                {detail.quantity}
                                            </td>

                                            <td className="px-3 py-3">
                                                {detail.uom?.code ?? "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Form LHP */}
                    <form
                        onSubmit={submit}
                        className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
                    >
                        <h3 className="mb-6 text-lg font-semibold text-gray-800">
                            Data Pemeriksaan LHP
                        </h3>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Nomor LHP
                                </label>

                                <input
                                    type="text"
                                    value={data.lhp_number}
                                    onChange={(e) =>
                                        setData("lhp_number", e.target.value)
                                    }
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    placeholder="Contoh: LHP-0001"
                                />

                                {errors.lhp_number && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.lhp_number}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Tanggal Pemeriksaan
                                </label>

                                <input
                                    type="date"
                                    value={data.inspection_date}
                                    onChange={(e) =>
                                        setData(
                                            "inspection_date",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />

                                {errors.inspection_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.inspection_date}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Qty Surat Jalan
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.001"
                                    value={data.qty_surat_jalan}
                                    onChange={(e) =>
                                        setData(
                                            "qty_surat_jalan",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />

                                {errors.qty_surat_jalan && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.qty_surat_jalan}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Total Qty OK
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.001"
                                    value={data.qty_ok}
                                    onChange={(e) =>
                                        setData("qty_ok", e.target.value)
                                    }
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />

                                {errors.qty_ok && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.qty_ok}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <Link
                                href={route(
                                    "goods-receipts.show",
                                    goodsReceipt.id,
                                )}
                                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                            >
                                {processing ? "Menyimpan..." : "Simpan LHP"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
