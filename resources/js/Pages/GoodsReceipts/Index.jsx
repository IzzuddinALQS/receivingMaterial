import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ goodsReceipts, auth }) {
    const isAdmin = auth.user.role === "admin";

    const statusLabel = {
        draft: "Draft",
        waiting_verification: "Menunggu Verifikasi",
        verified: "Terverifikasi",
        waiting_qc: "Menunggu QC",
        completed: "Selesai",
        returned_for_revision: "Dikembalikan",
    };

    const statusClass = {
        draft: "bg-slate-100 text-slate-700",
        waiting_verification: "bg-yellow-100 text-yellow-700",
        verified: "bg-blue-100 text-blue-700",
        waiting_qc: "bg-purple-100 text-purple-700",
        completed: "bg-green-100 text-green-700",
        returned_for_revision: "bg-red-100 text-red-700",
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-slate-800">
                    FPB
                </h2>
            }
        >
            <Head title="FPB" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                        {/* Header */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">
                                    Form Penerimaan Barang
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    Daftar penerimaan barang dari supplier.
                                </p>
                            </div>

                            <Link
                                href={route("goods-receipts.create")}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-700"
                            >
                                + Tambah FPB
                            </Link>
                        </div>

                        {/* Table */}
                        <div className="mt-6 overflow-hidden rounded-xl border border-slate-100">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-100 text-sm">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                No
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Nomor FPB
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Supplier
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Tanggal
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Jumlah Item
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Total Qty
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Status
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {goodsReceipts.data.length > 0 ? (
                                            goodsReceipts.data.map(
                                                (receipt, index) => (
                                                    <tr key={receipt.id}>
                                                        {/* No */}
                                                        <td className="px-4 py-3 text-slate-500">
                                                            {goodsReceipts.from +
                                                                index}
                                                        </td>

                                                        {/* Nomor FPB */}
                                                        <td className="px-4 py-3 font-semibold text-slate-800">
                                                            {receipt.fpb_number}
                                                        </td>

                                                        {/* Supplier */}
                                                        <td className="px-4 py-3 text-slate-600">
                                                            {receipt.supplier
                                                                ?.name ?? "-"}
                                                        </td>

                                                        {/* Tanggal */}
                                                        <td className="px-4 py-3 text-slate-600">
                                                            {new Date(
                                                                receipt.received_date,
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                },
                                                            )}
                                                        </td>

                                                        {/* Jumlah Item */}
                                                        <td className="px-4 py-3 text-slate-600">
                                                            {
                                                                receipt.details
                                                                    .length
                                                            }
                                                        </td>

                                                        {/* Total Quantity */}
                                                        <td className="px-4 py-3 font-semibold text-slate-700">
                                                            {receipt.details.reduce(
                                                                (
                                                                    total,
                                                                    detail,
                                                                ) =>
                                                                    total +
                                                                    Number(
                                                                        detail.quantity,
                                                                    ),
                                                                0,
                                                            )}
                                                        </td>

                                                        {/* Status */}
                                                        <td className="px-4 py-3">
                                                            <span
                                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                                    statusClass[
                                                                        receipt
                                                                            .status
                                                                    ] ??
                                                                    "bg-slate-100 text-slate-700"
                                                                }`}
                                                            >
                                                                {statusLabel[
                                                                    receipt
                                                                        .status
                                                                ] ??
                                                                    receipt.status}
                                                            </span>
                                                        </td>

                                                        {/* Aksi */}
                                                        <td className="px-4 py-3">
                                                            <div className="flex flex-wrap items-center gap-3">
                                                                {/* Detail */}
                                                                <Link
                                                                    href={route(
                                                                        "goods-receipts.show",
                                                                        receipt.id,
                                                                    )}
                                                                    className="font-semibold text-secondary-700 hover:underline"
                                                                >
                                                                    Detail
                                                                </Link>

                                                                {/* Draft Actions */}
                                                                {isAdmin &&
                                                                    receipt.status ===
                                                                        "draft" && (
                                                                        <>
                                                                            {/* Edit */}
                                                                            <Link
                                                                                href={route(
                                                                                    "goods-receipts.edit",
                                                                                    receipt.id,
                                                                                )}
                                                                                className="font-semibold text-accent-700 hover:underline"
                                                                            >
                                                                                Edit
                                                                            </Link>

                                                                            {/* Submit */}
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    if (
                                                                                        confirm(
                                                                                            "Yakin ingin submit FPB ini? Setelah disubmit, FPB tidak dapat diedit atau dihapus.",
                                                                                        )
                                                                                    ) {
                                                                                        router.post(
                                                                                            route(
                                                                                                "goods-receipts.submit",
                                                                                                receipt.id,
                                                                                            ),
                                                                                            {},
                                                                                            {
                                                                                                preserveScroll: true,
                                                                                            },
                                                                                        );
                                                                                    }
                                                                                }}
                                                                                className="font-semibold text-blue-600 hover:underline"
                                                                            >
                                                                                Submit
                                                                            </button>

                                                                            {/* Hapus */}
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    if (
                                                                                        confirm(
                                                                                            "Yakin ingin menghapus FPB ini?",
                                                                                        )
                                                                                    ) {
                                                                                        router.delete(
                                                                                            route(
                                                                                                "goods-receipts.destroy",
                                                                                                receipt.id,
                                                                                            ),
                                                                                            {
                                                                                                preserveScroll: true,
                                                                                            },
                                                                                        );
                                                                                    }
                                                                                }}
                                                                                className="font-semibold text-red-600 hover:underline"
                                                                            >
                                                                                Hapus
                                                                            </button>
                                                                        </>
                                                                    )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="8"
                                                    className="px-4 py-6 text-center text-slate-400"
                                                >
                                                    Belum ada FPB.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            {goodsReceipts.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url ?? "#"}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`rounded-xl px-3.5 py-2 text-sm font-medium ${
                                        link.active
                                            ? "bg-accent-600 text-white"
                                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                    } ${
                                        !link.url
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
