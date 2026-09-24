import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ statistics, latestGoodsReceipts }) {
    const statCards = [
        {
            label: "Total Goods Receipt",
            value: statistics.totalGoodsReceipts,
            caption: "Dokumen penerimaan",
            tone: "accent",
        },
        {
            label: "Total Supplier",
            value: statistics.totalSuppliers,
            caption: "Supplier terdaftar",
            tone: "secondary",
        },
        {
            label: "Total Product",
            value: statistics.totalProducts,
            caption: "Produk terdaftar",
            tone: "accent",
        },
        {
            label: "Total Quantity",
            value: statistics.totalQuantity,
            caption: "Barang diterima",
            tone: "secondary",
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-slate-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Welcome */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                        <h1 className="text-2xl font-bold text-slate-800">
                            Selamat datang 👋
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Ringkasan sistem penerimaan barang.
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {statCards.map((card) => (
                            <div
                                key={card.label}
                                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-slate-500">
                                        {card.label}
                                    </p>

                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${
                                            card.tone === "accent"
                                                ? "bg-accent-500"
                                                : "bg-secondary-500"
                                        }`}
                                    />
                                </div>

                                <p className="mt-3 text-3xl font-bold text-slate-800">
                                    {card.value}
                                </p>

                                <p className="mt-1 text-sm text-slate-400">
                                    {card.caption}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Latest Goods Receipts */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">
                                    Goods Receipt Terbaru
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Lima penerimaan barang terakhir.
                                </p>
                            </div>

                            <Link
                                href={route("goods-receipts.index")}
                                className="text-sm font-semibold text-secondary-700 hover:underline"
                            >
                                Lihat Semua
                            </Link>
                        </div>

                        <div className="mt-6 overflow-hidden rounded-xl border border-slate-100">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-100 text-sm">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                No GR
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Supplier
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Tanggal
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Total Qty
                                            </th>

                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 bg-white">
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
                                                            <td className="px-4 py-3 font-semibold text-slate-800">
                                                                {
                                                                    receipt.goods_receipt_no
                                                                }
                                                            </td>

                                                            <td className="px-4 py-3 text-slate-600">
                                                                {
                                                                    receipt
                                                                        .supplier
                                                                        .name
                                                                }
                                                            </td>

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

                                                            <td className="px-4 py-3 text-slate-600">
                                                                {totalQuantity}
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <Link
                                                                    href={route(
                                                                        "goods-receipts.show",
                                                                        receipt.id,
                                                                    )}
                                                                    className="font-semibold text-secondary-700 hover:underline"
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
                                                    className="px-4 py-6 text-center text-slate-400"
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
