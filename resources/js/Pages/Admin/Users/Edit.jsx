import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name ?? "",
        email: user.email ?? "",
        role: user.role ?? "staff",
        password: "",
    });

    const submit = (event) => {
        event.preventDefault();

        put(route("admin.users.update", user.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800">
                    Edit User
                </h2>
            }
        >
            <Head title={`Edit User - ${user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">
                                Edit User
                            </h1>

                            <p className="mt-1 text-sm text-slate-600">
                                Ubah informasi dan role pengguna.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Nama */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Nama
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

                            {/* Email */}
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

                            {/* Role */}
                            <div>
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Role
                                </label>

                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={(event) =>
                                        setData("role", event.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
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

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Password Baru
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(event) =>
                                        setData("password", event.target.value)
                                    }
                                    placeholder="Kosongkan jika tidak ingin mengubah password"
                                    className="mt-1 w-full rounded-md border-slate-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                                />

                                <p className="mt-1 text-xs text-slate-500">
                                    Isi hanya jika password ingin diganti.
                                </p>

                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Tombol */}
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
                                    className="rounded-md bg-accent-600 px-4 py-2 text-sm font-medium text-white hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-50"
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
