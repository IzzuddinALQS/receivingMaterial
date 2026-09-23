import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ incomingGoods, flash }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800">
                    Barang Masuk
                </h2>
            }
        >
            <Head title="Barang Masuk" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-slate-900">
                            {flash?.success && (
                                <div className="mb-6 rounded-md bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
                                    {flash.success}
                                </div>
                            )}
                            {/* Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        Data Barang Masuk
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-600">
                                        Daftar barang yang telah diterima.
                                    </p>
                                </div>

                                <Link
                                    href={route("incoming-goods.create")}
                                    className="rounded-md bg-accent-600 px-4 py-2 text-sm font-semibold text-black hover:bg-accent-700"
                                >
                                    + Tambah Barang
                                </Link>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                                No
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                                Nama Barang
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                                Jumlah
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                                Supplier
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                                Tanggal
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-200 bg-white">
                                        {incomingGoods.data.length > 0 ? (
                                            incomingGoods.data.map(
                                                (item, index) => (
                                                    <tr key={item.id}>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                                                            {incomingGoods.from +
                                                                index}
                                                        </td>

                                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                                                            {item.item_name}
                                                        </td>

                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                                                            {item.quantity}
                                                        </td>

                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                                                            {item.supplier}
                                                        </td>

                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                                                            {new Date(
                                                                item.received_date,
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                },
                                                            )}
                                                        </td>

                                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                            <Link
                                                                href={route(
                                                                    "incoming-goods.edit",
                                                                    item.id,
                                                                )}
                                                                className="mr-3 font-medium text-accent-600 hover:text-accent-900"
                                                            >
                                                                Edit
                                                            </Link>

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    if (
                                                                        confirm(
                                                                            "Apakah kamu yakin ingin menghapus barang ini?",
                                                                        )
                                                                    ) {
                                                                        router.delete(
                                                                            route(
                                                                                "incoming-goods.destroy",
                                                                                item.id,
                                                                            ),
                                                                            {
                                                                                preserveScroll: true,
                                                                            },
                                                                        );
                                                                    }
                                                                }}
                                                                className="font-medium text-red-600 hover:text-red-900"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="px-6 py-8 text-center text-sm text-slate-500"
                                                >
                                                    Belum ada data barang masuk.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {incomingGoods.links.map((link, index) => (
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
                                            }`}
                                        />
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
