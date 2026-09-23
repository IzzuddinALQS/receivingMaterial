import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";

export default function Index({ products }) {
    const { flash, errors } = usePage().props;

    const handleDelete = (product) => {
        if (!confirm(`Yakin ingin menghapus product "${product.name}"?`)) {
            return;
        }

        router.delete(route("admin.products.destroy", product.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-800">
                    Kelola Product
                </h2>
            }
        >
            <Head title="Kelola Product" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-800">
                                        Kelola Product
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-600">
                                        Kelola data product yang tersedia.
                                    </p>
                                </div>

                                <Link
                                    href={route("admin.products.create")}
                                    className="rounded-md bg-accent-600 px-4 py-2 text-sm font-medium text-white hover:bg-accent-700"
                                >
                                    + Tambah Product
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
                                                Kode Product
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Nama Product
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Deskripsi
                                            </th>

                                            <th className="border px-4 py-3 text-left">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {products.data.length > 0 ? (
                                            products.data.map(
                                                (product, index) => (
                                                    <tr key={product.id}>
                                                        <td className="border px-4 py-3">
                                                            {products.from +
                                                                index}
                                                        </td>

                                                        <td className="border px-4 py-3 font-medium">
                                                            {
                                                                product.product_code
                                                            }
                                                        </td>

                                                        <td className="border px-4 py-3">
                                                            {product.name}
                                                        </td>

                                                        <td className="border px-4 py-3">
                                                            {product.description ||
                                                                "-"}
                                                        </td>

                                                        <td className="border px-4 py-3">
                                                            <div className="flex items-center gap-3">
                                                                <Link
                                                                    href={route(
                                                                        "admin.products.edit",
                                                                        product.id,
                                                                    )}
                                                                    className="text-yellow-600 hover:underline"
                                                                >
                                                                    Edit
                                                                </Link>

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            product,
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
                                                    colSpan="5"
                                                    className="border px-4 py-6 text-center text-slate-500"
                                                >
                                                    Belum ada product.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {products.links.map((link, index) => (
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
