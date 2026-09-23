import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ statistics, latestGoodsReceipts }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Welcome */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Dashboard
                            </h1>

                            <p className="mt-1 text-sm text-gray-600">
                                Ringkasan sistem penerimaan barang.
                            </p>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Goods Receipt */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Total Goods Receipt
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-800">
                                {statistics.totalGoodsReceipts}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Dokumen penerimaan
                            </p>
                        </div>

                        {/* Supplier */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Total Supplier
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-800">
                                {statistics.totalSuppliers}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Supplier terdaftar
                            </p>
                        </div>

                        {/* Product */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Total Product
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-800">
                                {statistics.totalProducts}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Produk terdaftar
                            </p>
                        </div>

                        {/* Quantity */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <p className="text-sm font-medium text-gray-500">
                                Total Quantity
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-800">
                                {statistics.totalQuantity}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Barang diterima
                            </p>
                        </div>
                    </div>

                    {/* Latest Goods Receipts */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">
                                        Goods Receipt Terbaru
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Lima penerimaan barang terakhir.
                                    </p>
                                </div>

                                <Link
                                    href={route("goods-receipts.index")}
                                    className="text-sm font-medium text-indigo-600 hover:underline"
                                >
                                    Lihat Semua
                                </Link>
                            </div>

                            <div className="mt-6 overflow-x-auto">
                                <table className="min-w-full border border-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-4 py-3 text-left">
                                                No GR
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Supplier
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Tanggal
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
                                        {latestGoodsReceipts.length > 0 ? (
                                            latestGoodsReceipts.map(
                                                (receipt) => {
                                                    const totalQuantity =
                                                        receipt.details.reduce(
                                                            (total, detail) =>
                                                                total +
                                                                Number(
                                                                    detail.quantity,
                                                                ),
                                                            0,
                                                        );

                                                    return (
                                                        <tr key={receipt.id}>
                                                            <td className="border px-4 py-3 font-medium">
                                                                {
                                                                    receipt.goods_receipt_no
                                                                }
                                                            </td>

                                                            <td className="border px-4 py-3">
                                                                {
                                                                    receipt
                                                                        .supplier
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
                                                                {totalQuantity}
                                                            </td>

                                                            <td className="border px-4 py-3">
                                                                <Link
                                                                    href={route(
                                                                        "goods-receipts.show",
                                                                        receipt.id,
                                                                    )}
                                                                    className="text-indigo-600 hover:underline"
                                                                >
                                                                    Detail
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );
                                                },
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="border px-4 py-6 text-center text-gray-500"
                                                >
                                                    Belum ada Goods Receipt.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
