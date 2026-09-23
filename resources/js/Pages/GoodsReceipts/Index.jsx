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
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        Goods Receipts
                                    </h1>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Daftar penerimaan barang
                                    </p>
                                </div>

                                <Link
                                    href={route("goods-receipts.create")}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                >
                                    + Tambah Goods Receipt
                                </Link>
                            </div>

                            {/* Table */}
                            <div className="mt-6 overflow-x-auto">
                                <table className="min-w-full border border-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-4 py-3 text-left">
                                                No
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Nomor GR
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Supplier
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Tanggal
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Produk
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Total Qty
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {goodsReceipts.data.length > 0 ? (
                                            goodsReceipts.data.map(
                                                (receipt, index) => (
                                                    <tr key={receipt.id}>
                                                        <td className="border px-4 py-3">
                                                            {goodsReceipts.from +
                                                                index}
                                                        </td>

                                                        <td className="border px-4 py-3 font-medium">
                                                            {
                                                                receipt.goods_receipt_no
                                                            }
                                                        </td>

                                                        <td className="border px-4 py-3">
                                                            {
                                                                receipt.supplier
                                                                    .name
                                                            }
                                                        </td>

                                                        <td className="border px-4 py-3">
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

                                                        <td className="border px-4 py-3">
                                                            <ul className="list-disc pl-5">
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
                                                            </ul>
                                                        </td>

                                                        <td className="border px-4 py-3">
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

                                                        <td className="border px-4 py-3">
                                                            <div className="flex items-center gap-3">
                                                                {/* Detail */}
                                                                <Link
                                                                    href={route(
                                                                        "goods-receipts.show",
                                                                        receipt.id,
                                                                    )}
                                                                    className="text-indigo-600 hover:underline"
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
                                                    className="border px-4 py-6 text-center text-gray-500"
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
                                                ? "bg-indigo-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
