import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ supplier }) {
    const { data, setData, put, processing, errors } = useForm({
        supplier_code: supplier.supplier_code ?? "",
        name: supplier.name ?? "",
        phone: supplier.phone ?? "",
        email: supplier.email ?? "",
        address: supplier.address ?? "",
    });

    const submit = (event) => {
        event.preventDefault();

        put(route("admin.suppliers.update", supplier.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800">
                    Edit Supplier
                </h2>
            }
        >
            <Head title={`Edit Supplier - ${supplier.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">
                                Edit Supplier
                            </h1>

                            <p className="mt-1 text-sm text-slate-600">
                                Ubah informasi supplier.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="supplier_code"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Kode Supplier
                                </label>

                                <input
                                    id="supplier_code"
                                    type="text"
                                    value={data.supplier_code}
                                    onChange={(event) =>
                                        setData(
                                            "supplier_code",
                                            event.target.value,
                                        )
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                                />

                                {errors.supplier_code && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.supplier_code}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Nama Supplier
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(event) =>
                                        setData("name", event.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Telepon
                                </label>

                                <input
                                    id="phone"
                                    type="text"
                                    value={data.phone}
                                    onChange={(event) =>
                                        setData("phone", event.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                                />

                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(event) =>
                                        setData("email", event.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                                />

                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Alamat
                                </label>

                                <textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(event) =>
                                        setData("address", event.target.value)
                                    }
                                    rows="4"
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                                />

                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    href={route("admin.suppliers.index")}
                                    className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
                                >
                                    Batal
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-accent-600 px-4 py-2 text-sm font-medium text-white hover:bg-accent-700 disabled:opacity-50"
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
        </AuthenticatedLayout>
    );
}
