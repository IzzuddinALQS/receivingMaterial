import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ incomingGood }) {
    const { data, setData, put, processing, errors } = useForm({
        item_name: incomingGood.item_name,
        quantity: incomingGood.quantity,
        supplier: incomingGood.supplier,
        received_date: incomingGood.received_date,
        description: incomingGood.description ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("incoming-goods.update", incomingGood.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800">
                    Edit Barang Masuk
                </h2>
            }
        >
            <Head title="Edit Barang Masuk" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-slate-900">
                                    Edit Barang Masuk
                                </h1>

                                <p className="mt-1 text-sm text-slate-600">
                                    Perbarui informasi barang masuk.
                                </p>
                            </div>

                            <form onSubmit={submit}>
                                {/* Nama Barang */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="item_name"
                                        className="block text-sm font-medium text-slate-700"
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
                                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
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
                                        className="block text-sm font-medium text-slate-700"
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
                                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
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
                                        className="block text-sm font-medium text-slate-700"
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
                                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
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
                                        className="block text-sm font-medium text-slate-700"
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
                                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
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
                                        className="block text-sm font-medium text-slate-700"
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
                                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
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
                                        className="rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-300"
                                    >
                                        Batal
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-accent-600 px-4 py-2 text-sm font-semibold text-black hover:bg-accent-700 disabled:opacity-50"
                                    >
                                        {processing
                                            ? "Menyimpan..."
                                            : "Simpan Perubahan"}
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
