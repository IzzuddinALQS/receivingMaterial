import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";

export default function Index({ suppliers }) {
    const { flash, errors } = usePage().props;

    const handleDelete = (supplier) => {
        if (!confirm(`Yakin ingin menghapus supplier "${supplier.name}"?`)) {
            return;
        }

        router.delete(route("admin.suppliers.destroy", supplier.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800">
                    Kelola Supplier
                </h2>
            }
        >
            <Head title="Kelola Supplier" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-800">
                                        Kelola Supplier
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-600">
                                        Kelola data supplier barang.
                                    </p>
                                </div>

                                <Link
                                    href={route("admin.suppliers.create")}
                                    className="rounded-md bg-accent-600 px-4 py-2 text-sm font-medium text-white hover:bg-accent-700"
                                >
                                    + Tambah Supplier
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
                                <table className="min-w-full border border-slate-200">
                                    <thead className="bg-slate-100">
                                        <tr>
                                            <th className="border px-4 py-3 text-left">
                                                No
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Kode
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Nama Supplier
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Telepon
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Email
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {suppliers.data.length > 0 ? (
                                            suppliers.data.map(
                                                (supplier, index) => (
                                                    <tr key={supplier.id}>
                                                        <td className="border px-4 py-3">
                                                            {suppliers.from +
                                                                index}
                                                        </td>

                                                        <td className="border px-4 py-3 font-medium">
                                                            {
                                                                supplier.supplier_code
                                                            }
                                                        </td>

                                                        <td className="border px-4 py-3">
                                                            {supplier.name}
                                                        </td>

                                                        <td className="border px-4 py-3">
                                                            {supplier.phone ||
                                                                "-"}
                                                        </td>

                                                        <td className="border px-4 py-3">
                                                            {supplier.email ||
                                                                "-"}
                                                        </td>

                                                        <td className="border px-4 py-3">
                                                            <div className="flex items-center gap-3">
                                                                <Link
                                                                    href={route(
                                                                        "admin.suppliers.edit",
                                                                        supplier.id,
                                                                    )}
                                                                    className="text-yellow-600 hover:underline"
                                                                >
                                                                    Edit
                                                                </Link>

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            supplier,
                                                                        )
                                                                    }
                                                                    className="text-red-600 hover:underline"
                                                                >
                                                                    Hapus
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="border px-4 py-6 text-center text-slate-500"
                                                >
                                                    Belum ada supplier.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {suppliers.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? "#"}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className={`rounded-md px-3 py-2 text-sm ${
                                            link.active
                                                ? "bg-accent-600 text-white"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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
