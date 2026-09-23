import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ goodsReceipt, suppliers, products }) {
    const { data, setData, put, processing, errors } = useForm({
        goods_receipt_no: goodsReceipt.goods_receipt_no,
        supplier_id: goodsReceipt.supplier_id,
        received_date: goodsReceipt.received_date,
        description: goodsReceipt.description ?? "",
        details: goodsReceipt.details.map((detail) => ({
            id: detail.id,
            product_id: detail.product_id,
            quantity: detail.quantity,
        })),
    });

    const updateDetail = (index, field, value) => {
        const newDetails = [...data.details];

        newDetails[index][field] = value;

        setData("details", newDetails);
    };

    const addDetail = () => {
        setData("details", [
            ...data.details,
            {
                id: null,
                product_id: "",
                quantity: 1,
            },
        ]);
    };

    const removeDetail = (index) => {
        if (data.details.length === 1) {
            return;
        }

        const newDetails = data.details.filter(
            (_, detailIndex) => detailIndex !== index,
        );

        setData("details", newDetails);
    };

    const submit = (e) => {
        e.preventDefault();

        put(route("goods-receipts.update", goodsReceipt.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit ${goodsReceipt.goods_receipt_no}`} />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">
                                Edit Goods Receipt
                            </h1>

                            <p className="mt-1 text-sm text-slate-600">
                                Perbarui data penerimaan barang.
                            </p>
                        </div>

                        <form onSubmit={submit}>
                            {/* Nomor GR */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Nomor Goods Receipt
                                </label>

                                <input
                                    type="text"
                                    value={data.goods_receipt_no}
                                    onChange={(e) =>
                                        setData(
                                            "goods_receipt_no",
                                            e.target.value,
                                        )
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300"
                                />

                                {errors.goods_receipt_no && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.goods_receipt_no}
                                    </p>
                                )}
                            </div>

                            {/* Supplier */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-slate-700">
                                    Supplier
                                </label>

                                <select
                                    value={data.supplier_id}
                                    onChange={(e) =>
                                        setData("supplier_id", e.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300"
                                >
                                    <option value="">Pilih Supplier</option>

                                    {suppliers.map((supplier) => (
                                        <option
                                            key={supplier.id}
                                            value={supplier.id}
                                        >
                                            {supplier.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.supplier_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.supplier_id}
                                    </p>
                                )}
                            </div>

                            {/* Tanggal */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-slate-700">
                                    Tanggal Penerimaan
                                </label>

                                <input
                                    type="date"
                                    value={data.received_date}
                                    onChange={(e) =>
                                        setData("received_date", e.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300"
                                />

                                {errors.received_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.received_date}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-slate-700">
                                    Keterangan
                                </label>

                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300"
                                    rows="3"
                                />

                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Detail Produk */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-slate-800">
                                        Detail Produk
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={addDetail}
                                        className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                                    >
                                        + Tambah Produk
                                    </button>
                                </div>

                                <div className="mt-4 space-y-4">
                                    {data.details.map((detail, index) => (
                                        <div
                                            key={index}
                                            className="rounded-md border p-4"
                                        >
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                {/* Product */}
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700">
                                                        Produk
                                                    </label>

                                                    <select
                                                        value={
                                                            detail.product_id
                                                        }
                                                        onChange={(e) =>
                                                            updateDetail(
                                                                index,
                                                                "product_id",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="mt-1 w-full rounded-md border-slate-300"
                                                    >
                                                        <option value="">
                                                            Pilih Produk
                                                        </option>

                                                        {products.map(
                                                            (product) => (
                                                                <option
                                                                    key={
                                                                        product.id
                                                                    }
                                                                    value={
                                                                        product.id
                                                                    }
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>

                                                    {errors[
                                                        `details.${index}.product_id`
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `details.${index}.product_id`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Quantity */}
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700">
                                                        Quantity
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={detail.quantity}
                                                        onChange={(e) =>
                                                            updateDetail(
                                                                index,
                                                                "quantity",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="mt-1 w-full rounded-md border-slate-300"
                                                    />

                                                    {errors[
                                                        `details.${index}.quantity`
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `details.${index}.quantity`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Hapus */}
                                                <div className="flex items-end">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeDetail(index)
                                                        }
                                                        disabled={
                                                            data.details
                                                                .length === 1
                                                        }
                                                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Button */}
                            <div className="mt-8 flex items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-accent-600 px-5 py-2 text-sm font-medium text-white hover:bg-accent-700 disabled:opacity-50"
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Perubahan"}
                                </button>

                                <Link
                                    href={route("goods-receipts.index")}
                                    className="rounded-md bg-slate-200 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
                                >
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
