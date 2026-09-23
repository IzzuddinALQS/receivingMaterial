import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        product_code: "",
        name: "",
        description: "",
    });

    const submit = (event) => {
        event.preventDefault();

        post(route("admin.products.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800">
                    Tambah Product
                </h2>
            }
        >
            <Head title="Tambah Product" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">
                                Tambah Product
                            </h1>

                            <p className="mt-1 text-sm text-slate-600">
                                Tambahkan product baru ke sistem.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="product_code"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Kode Product
                                </label>

                                <input
                                    id="product_code"
                                    type="text"
                                    value={data.product_code}
                                    onChange={(event) =>
                                        setData(
                                            "product_code",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="PRD-0001"
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                                />

                                {errors.product_code && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.product_code}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Nama Product
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
                                    htmlFor="description"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Deskripsi
                                </label>

                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(event) =>
                                        setData(
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                    rows="4"
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                                />

                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    href={route("admin.products.index")}
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
                                        : "Simpan Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
