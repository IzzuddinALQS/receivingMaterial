import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ goodsReceipts, auth }) {
    const isAdmin = auth.user.role === "admin";

    return (
        <AuthenticatedLayout>
            <Head title="Goods Receipts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-800">
                                        Goods Receipts
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-600">
                                        Daftar penerimaan barang
                                    </p>
                                </div>

                                <Link
                                    href={route("goods-receipts.create")}
                                    className="rounded-md bg-accent-600 px-4 py-2 text-sm font-medium text-white hover:bg-accent-700"
                                >
                                    + Tambah Goods Receipt
                                </Link>
                            </div>

                            {/* Table */}
                            <div className="mt-6 overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200 text-sm">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                No
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Nomor GR
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Supplier
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Tanggal
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Produk
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Total Qty
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {goodsReceipts.data.length > 0 ? (
                                            goodsReceipts.data.map(
                                                (receipt, index) => (
                                                    <tr key={receipt.id}>
                                                        <td className="border-t border-slate-100 px-4 py-3">
                                                            {goodsReceipts.from +
                                                                index}
                                                        </td>

                                                        <td className="border-t border-slate-100 px-4 py-3 font-medium">
                                                            {
                                                                receipt.goods_receipt_no
                                                            }
                                                        </td>

                                                        <td className="border-t border-slate-100 px-4 py-3">
                                                            {
                                                                receipt.supplier
                                                                    .name
                                                            }
                                                        </td>

                                                        <td className="border-t border-slate-100 px-4 py-3">
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

                                                        <td className="border-t border-slate-100 px-4 py-3">
                                                            <ol className="list-disc pl-5">
                                                                {receipt.details.map(
                                                                    (
                                                                        detail,
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                detail.id
                                                                            }
                                                                        >
                                                                            {
                                                                                detail
                                                                                    .product
                                                                                    .name
                                                                            }
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ol>
                                                        </td>

                                                        <td className="border-t border-slate-100 px-4 py-3">
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

                                                        <td className="border-t border-slate-100 px-4 py-3">
                                                            <div className="flex items-center gap-3">
                                                                {/* Detail */}
                                                                <Link
                                                                    href={route(
                                                                        "goods-receipts.show",
                                                                        receipt.id,
                                                                    )}
                                                                    className="text-accent-600 hover:underline"
                                                                >
                                                                    Detail
                                                                </Link>

                                                                {/* Admin Actions */}
                                                                {isAdmin && (
                                                                    <>
                                                                        <Link
                                                                            href={route(
                                                                                "goods-receipts.edit",
                                                                                receipt.id,
                                                                            )}
                                                                            className="text-yellow-600 hover:underline"
                                                                        >
                                                                            Edit
                                                                        </Link>

                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                if (
                                                                                    confirm(
                                                                                        "Yakin ingin menghapus Goods Receipt ini?",
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
                                                                            className="text-red-600 hover:underline"
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
                                                    colSpan="7"
                                                    className="border px-4 py-6 text-center text-slate-500"
                                                >
                                                    Belum ada Goods Receipt.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
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
                                        className={`rounded-md px-3 py-2 text-sm ${
                                            link.active
                                                ? "bg-accent-600 text-white"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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
            </div>
        </AuthenticatedLayout>
    );
}
