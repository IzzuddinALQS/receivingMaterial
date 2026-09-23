import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ goodsReceipt }) {
    const totalQuantity = goodsReceipt.details.reduce(
        (total, detail) => total + Number(detail.quantity),
        0,
    );

    return (
        <AuthenticatedLayout>
            <Head title={`Goods Receipt ${goodsReceipt.goods_receipt_no}`} />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {goodsReceipt.goods_receipt_no}
                                </h1>

                                <p className="text-sm text-gray-600">
                                    Detail penerimaan barang
                                </p>
                            </div>

                            <Link
                                href={route("goods-receipts.index")}
                                className="rounded-md bg-gray-200 px-4 py-2"
                            >
                                Kembali
                            </Link>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Supplier
                                </p>

                                <p className="font-medium">
                                    {goodsReceipt.supplier.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Tanggal</p>

                                <p className="font-medium">
                                    {new Date(
                                        goodsReceipt.received_date,
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-lg font-bold">Daftar Produk</h2>

                            <table className="mt-3 min-w-full border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-4 py-3 text-left">
                                            No
                                        </th>

                                        <th className="border px-4 py-3 text-left">
                                            Produk
                                        </th>

                                        <th className="border px-4 py-3 text-left">
                                            Quantity
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {goodsReceipt.details.map(
                                        (detail, index) => (
                                            <tr key={detail.id}>
                                                <td className="border px-4 py-3">
                                                    {index + 1}
                                                </td>

                                                <td className="border px-4 py-3">
                                                    {detail.product.name}
                                                </td>

                                                <td className="border px-4 py-3">
                                                    {detail.quantity}
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>

                                <tfoot>
                                    <tr className="font-bold">
                                        <td
                                            colSpan="2"
                                            className="border px-4 py-3 text-right"
                                        >
                                            Total
                                        </td>

                                        <td className="border px-4 py-3">
                                            {totalQuantity}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
