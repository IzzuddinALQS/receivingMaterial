import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ suppliers, products }) {
    const { data, setData, post, processing, errors } = useForm({
        goods_receipt_no: "",
        supplier_id: "",
        received_date: "",
        description: "",
        details: [
            {
                product_id: "",
                quantity: 1,
            },
        ],
    });

    const addDetail = () => {
        setData("details", [
            ...data.details,
            {
                product_id: "",
                quantity: 1,
            },
        ]);
    };

    const removeDetail = (index) => {
        const newDetails = data.details.filter(
            (_, detailIndex) => detailIndex !== index,
        );

        setData("details", newDetails);
    };

    const updateDetail = (index, field, value) => {
        const newDetails = [...data.details];

        newDetails[index][field] = value;

        setData("details", newDetails);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("goods-receipts.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Goods Receipt" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold">
                                Tambah Goods Receipt
                            </h1>

                            <p className="text-sm text-gray-600">
                                Masukkan data penerimaan barang.
                            </p>
                        </div>

                        <form onSubmit={submit}>
                            {/* Nomor GR */}
                            <div className="mb-4">
                                <label className="block font-medium">
                                    Nomor GR
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
                                    className="mt-1 w-full rounded-md border-gray-300"
                                    placeholder="Contoh: GR-002"
                                />

                                {errors.goods_receipt_no && (
                                    <p className="text-sm text-red-500">
                                        {errors.goods_receipt_no}
                                    </p>
                                )}
                            </div>

                            {/* Supplier */}
                            <div className="mb-4">
                                <label className="block font-medium">
                                    Supplier
                                </label>

                                <select
                                    value={data.supplier_id}
                                    onChange={(e) =>
                                        setData("supplier_id", e.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-gray-300"
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
                                    <p className="text-sm text-red-500">
                                        {errors.supplier_id}
                                    </p>
                                )}
                            </div>

                            {/* Tanggal */}
                            <div className="mb-4">
                                <label className="block font-medium">
                                    Tanggal
                                </label>

                                <input
                                    type="date"
                                    value={data.received_date}
                                    onChange={(e) =>
                                        setData("received_date", e.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-gray-300"
                                />

                                {errors.received_date && (
                                    <p className="text-sm text-red-500">
                                        {errors.received_date}
                                    </p>
                                )}
                            </div>

                            {/* Produk */}
                            <div className="mt-8">
                                <div className="mb-3 flex items-center justify-between">
                                    <h2 className="text-lg font-bold">
                                        Produk
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={addDetail}
                                        className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white"
                                    >
                                        + Tambah Produk
                                    </button>
                                </div>

                                {data.details.map((detail, index) => (
                                    <div
                                        key={index}
                                        className="mb-3 flex gap-3"
                                    >
                                        <select
                                            value={detail.product_id}
                                            onChange={(e) =>
                                                updateDetail(
                                                    index,
                                                    "product_id",
                                                    e.target.value,
                                                )
                                            }
                                            className="flex-1 rounded-md border-gray-300"
                                        >
                                            <option value="">
                                                Pilih Produk
                                            </option>

                                            {products.map((product) => (
                                                <option
                                                    key={product.id}
                                                    value={product.id}
                                                >
                                                    {product.name}
                                                </option>
                                            ))}
                                        </select>

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
                                            className="w-32 rounded-md border-gray-300"
                                        />

                                        {data.details.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeDetail(index)
                                                }
                                                className="rounded-md bg-red-600 px-3 py-2 text-white"
                                            >
                                                Hapus
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <label className="block font-medium">
                                    Deskripsi
                                </label>

                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-gray-300"
                                    rows="3"
                                />
                            </div>

                            {/* Tombol */}
                            <div className="mt-6 flex gap-3">
                                <Link
                                    href={route("goods-receipts.index")}
                                    className="rounded-md bg-gray-200 px-4 py-2"
                                >
                                    Batal
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-white"
                                >
                                    {processing ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
