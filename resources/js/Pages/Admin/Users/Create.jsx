import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        role: "staff",
        password: "",
    });

    const submit = (event) => {
        event.preventDefault();

        post(route("admin.users.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800">
                    Tambah User
                </h2>
            }
        >
            <Head title="Tambah User" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">
                                Tambah User
                            </h1>

                            <p className="mt-1 text-sm text-slate-600">
                                Buat akun pengguna baru.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Nama
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(event) =>
                                        setData("name", event.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(event) =>
                                        setData("email", event.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm"
                                />

                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Role
                                </label>

                                <select
                                    value={data.role}
                                    onChange={(event) =>
                                        setData("role", event.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm"
                                >
                                    <option value="staff">Staff</option>

                                    <option value="admin">Admin</option>
                                </select>

                                {errors.role && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.role}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(event) =>
                                        setData("password", event.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm"
                                />

                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    href={route("admin.users.index")}
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
                                        : "Simpan User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
