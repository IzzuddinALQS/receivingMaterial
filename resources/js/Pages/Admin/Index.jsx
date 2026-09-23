import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800">
                    Admin Panel
                </h2>
            }
        >
            <Head title="Admin Panel" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">
                                    Admin Panel
                                </h1>

                                <p className="mt-1 text-sm text-slate-600">
                                    Kelola sistem dan pengguna aplikasi.
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <Link
                                    href={route("admin.users.index")}
                                    className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-accent-400 hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-800 group-hover:text-accent-600">
                                                Kelola User
                                            </h2>

                                            <p className="mt-2 text-sm text-slate-600">
                                                Tambah, edit, lihat, dan hapus
                                                pengguna sistem.
                                            </p>
                                        </div>

                                        <div className="text-3xl">👥</div>
                                    </div>
                                </Link>

                                <Link
                                    href={route("admin.suppliers.index")}
                                    className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-accent-400 hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-800 group-hover:text-accent-600">
                                                Kelola Supplier
                                            </h2>

                                            <p className="mt-2 text-sm text-slate-600">
                                                Tambah, edit, dan kelola data
                                                supplier.
                                            </p>
                                        </div>

                                        <div className="text-3xl">🏢</div>
                                    </div>
                                </Link>

                                <Link
                                    href={route("admin.products.index")}
                                    className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-accent-400 hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-800 group-hover:text-accent-600">
                                                Kelola Product
                                            </h2>

                                            <p className="mt-2 text-sm text-slate-600">
                                                Tambah, edit, dan kelola data
                                                product.
                                            </p>
                                        </div>

                                        <div className="text-3xl">📦</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
