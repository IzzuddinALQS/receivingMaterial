import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        item_name: "",
        quantity: "",
        supplier: "",
        received_date: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("incoming-goods.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah Barang Masuk
                </h2>
            }
        >
            <Head title="Tambah Barang Masuk" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Tambah Barang Masuk
                                </h1>

                                <p className="mt-1 text-sm text-gray-600">
                                    Masukkan informasi barang yang diterima.
                                </p>
                            </div>

                            <form onSubmit={submit}>
                                {/* Nama Barang */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="item_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Nama Barang
                                    </label>

                                    <input
                                        id="item_name"
                                        type="text"
                                        value={data.item_name}
                                        onChange={(e) =>
                                            setData("item_name", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Contoh: Laptop Lenovo"
                                    />

                                    {errors.item_name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.item_name}
                                        </p>
                                    )}
                                </div>

                                {/* Jumlah */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="quantity"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Jumlah
                                    </label>

                                    <input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        value={data.quantity}
                                        onChange={(e) =>
                                            setData("quantity", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Contoh: 10"
                                    />

                                    {errors.quantity && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.quantity}
                                        </p>
                                    )}
                                </div>

                                {/* Supplier */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="supplier"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Supplier
                                    </label>

                                    <input
                                        id="supplier"
                                        type="text"
                                        value={data.supplier}
                                        onChange={(e) =>
                                            setData("supplier", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Contoh: PT Maju Jaya"
                                    />

                                    {errors.supplier && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.supplier}
                                        </p>
                                    )}
                                </div>

                                {/* Tanggal */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="received_date"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tanggal Diterima
                                    </label>

                                    <input
                                        id="received_date"
                                        type="date"
                                        value={data.received_date}
                                        onChange={(e) =>
                                            setData(
                                                "received_date",
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />

                                    {errors.received_date && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.received_date}
                                        </p>
                                    )}
                                </div>

                                {/* Deskripsi */}
                                <div className="mb-6">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Deskripsi
                                    </label>

                                    <textarea
                                        id="description"
                                        rows="4"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Keterangan tambahan (opsional)"
                                    />

                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Tombol */}
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={route("incoming-goods.index")}
                                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
                                    >
                                        Batal
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-black hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {processing
                                            ? "Menyimpan..."
                                            : "Simpan Barang"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
