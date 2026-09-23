import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";

export default function Index({ users }) {
    const { auth, flash, errors } = usePage().props;

    const handleDelete = (user) => {
        if (!confirm(`Yakin ingin menghapus user "${user.name}"?`)) {
            return;
        }

        router.delete(route("admin.users.destroy", user.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kelola User
                </h2>
            }
        >
            <Head title="Kelola User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        Kelola User
                                    </h1>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Kelola akun dan role pengguna sistem.
                                    </p>
                                </div>

                                <Link
                                    href={route("admin.users.create")}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                >
                                    + Tambah User
                                </Link>
                            </div>

                            {flash?.success && (
                                <div className="mt-6 rounded-md bg-green-50 p-4 text-green-700">
                                    {flash.success}
                                </div>
                            )}

                            {errors?.delete && (
                                <div className="mt-6 rounded-md bg-red-50 p-4 text-red-700">
                                    {errors.delete}
                                </div>
                            )}

                            <div className="mt-6 overflow-x-auto">
                                <table className="min-w-full border border-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-4 py-3 text-left">
                                                No
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Nama
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Email
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Role
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.data.length > 0 ? (
                                            users.data.map((user, index) => (
                                                <tr key={user.id}>
                                                    <td className="border px-4 py-3">
                                                        {users.from + index}
                                                    </td>

                                                    <td className="border px-4 py-3 font-medium">
                                                        {user.name}
                                                    </td>

                                                    <td className="border px-4 py-3">
                                                        {user.email}
                                                    </td>

                                                    <td className="border px-4 py-3">
                                                        <span
                                                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                                user.role ===
                                                                "admin"
                                                                    ? "bg-purple-100 text-purple-700"
                                                                    : "bg-blue-100 text-blue-700"
                                                            }`}
                                                        >
                                                            {user.role}
                                                        </span>
                                                    </td>

                                                    <td className="border px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <Link
                                                                href={route(
                                                                    "admin.users.edit",
                                                                    user.id,
                                                                )}
                                                                className="text-yellow-600 hover:underline"
                                                            >
                                                                Edit
                                                            </Link>

                                                            {user.id !==
                                                                auth.user
                                                                    .id && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            user,
                                                                        )
                                                                    }
                                                                    className="text-red-600 hover:underline"
                                                                >
                                                                    Hapus
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="border px-4 py-6 text-center text-gray-500"
                                                >
                                                    Belum ada user.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {users.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? "#"}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className={`rounded-md px-3 py-2 text-sm ${
                                            link.active
                                                ? "bg-indigo-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        } ${
                                            !link.url
                                                ? "cursor-not-allowed opacity-50"
                                                : ""
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
