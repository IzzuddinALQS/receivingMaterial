import { Head, Link } from "@inertiajs/react";

const features = [
    {
        icon: "📦",
        title: "Goods Receipt",
        description:
            "Catat dan kelola setiap penerimaan barang dari supplier secara rapi dan terstruktur, lengkap dengan detail item dan kuantitas.",
    },
    {
        icon: "🏭",
        title: "Manajemen Supplier",
        description:
            "Kelola data supplier terdaftar, pantau riwayat pengiriman, dan jaga hubungan kerja sama tetap teratur.",
    },
    {
        icon: "🗂️",
        title: "Manajemen Produk",
        description:
            "Kelola katalog produk secara terpusat sehingga proses pencatatan penerimaan barang menjadi lebih cepat dan akurat.",
    },
    {
        icon: "📊",
        title: "Ringkasan & Laporan",
        description:
            "Pantau statistik penerimaan barang secara real-time melalui dashboard yang informatif dan mudah dipahami.",
    },
];

export default function Welcome({ auth = {}, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Selamat Datang" />

            <div className="min-h-screen bg-slate-50 text-slate-800">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Header */}
                    <header className="flex items-center justify-between py-6">
                        <div className="flex items-center gap-2">
                            <div className="flex size-9 items-center justify-center rounded-lg bg-accent-600 text-sm font-bold text-white">
                                RM
                            </div>
                            <span className="text-lg font-semibold text-slate-800">
                                Receiving Material
                            </span>
                        </div>

                        <nav className="flex items-center gap-2">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-md bg-accent-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
                                    >
                                        Masuk
                                    </Link>

                                    <Link
                                        href={route("register")}
                                        className="rounded-md bg-accent-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    {/* Hero */}
                    <main className="py-16 text-center sm:py-24">
                        <span className="inline-block rounded-full bg-accent-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-accent-700">
                            Sistem Penerimaan Barang
                        </span>

                        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            Kelola Penerimaan Barang
                            <span className="text-accent-600">
                                {" "}
                                Lebih Rapi & Terpusat
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                            Satu platform untuk mencatat goods receipt,
                            mengelola supplier, dan memantau produk — membantu
                            tim gudang bekerja lebih cepat, akurat, dan
                            terdokumentasi dengan baik.
                        </p>

                        <div className="mt-8 flex items-center justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-md bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
                                >
                                    Buka Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("register")}
                                        className="rounded-md bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
                                    >
                                        Mulai Sekarang
                                    </Link>

                                    <Link
                                        href={route("login")}
                                        className="rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
                                    >
                                        Masuk
                                    </Link>
                                </>
                            )}
                        </div>
                    </main>

                    {/* Features */}
                    <section className="pb-20">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
                                >
                                    <div className="flex size-12 items-center justify-center rounded-full bg-accent-50 text-2xl">
                                        {feature.icon}
                                    </div>

                                    <h2 className="mt-4 text-base font-semibold text-slate-800">
                                        {feature.title}
                                    </h2>

                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
                        Receiving Material &middot; Laravel v{laravelVersion}{" "}
                        (PHP v{phpVersion})
                    </footer>
                </div>
            </div>
        </>
    );
}
