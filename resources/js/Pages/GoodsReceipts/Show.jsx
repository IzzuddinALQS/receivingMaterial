import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";

export default function Show({ goodsReceipt, qualityInspections = [] }) {
    const { flash } = usePage().props;

    const totalQuantity = goodsReceipt.details.reduce(
        (total, detail) => total + Number(detail.quantity),
        0,
    );

    const statusLabel = {
        draft: "Draft",
        waiting_verification: "Menunggu Verifikasi",
        verified: "Terverifikasi",
        waiting_qc: "Menunggu QC",
        completed: "Selesai",
        returned_for_revision: "Dikembalikan",
    };

    const statusClass = {
        draft: "bg-slate-100 text-slate-700",
        waiting_verification: "bg-yellow-100 text-yellow-700",
        verified: "bg-blue-100 text-blue-700",
        waiting_qc: "bg-purple-100 text-purple-700",
        completed: "bg-green-100 text-green-700",
        returned_for_revision: "bg-red-100 text-red-700",
    };

    const handleVerify = () => {
        if (!window.confirm("Apakah Anda yakin ingin memverifikasi FPB ini?")) {
            return;
        }

        router.post(route("goods-receipts.verify", goodsReceipt.id));
    };

    const handleSendToQc = () => {
        if (
            !window.confirm(
                "Apakah Anda yakin ingin mengirim FPB ini ke Quality untuk pemeriksaan?",
            )
        ) {
            return;
        }

        router.post(route("goods-receipts.send-to-qc", goodsReceipt.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`FPB ${goodsReceipt.fpb_number}`} />

            <div className="py-8">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    {/* Flash Message */}
                    {flash?.success && (
                        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-800">
                            {flash.success}
                        </div>
                    )}

                    {flash?.error && (
                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-800">
                            {flash.error}
                        </div>
                    )}

                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                        {/* Header */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-2xl font-bold text-slate-800">
                                        {goodsReceipt.fpb_number}
                                    </h1>

                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                            statusClass[goodsReceipt.status] ??
                                            "bg-slate-100 text-slate-700"
                                        }`}
                                    >
                                        {statusLabel[goodsReceipt.status] ??
                                            goodsReceipt.status}
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-slate-500">
                                    Detail Form Penerimaan Barang
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {goodsReceipt.status ===
                                    "waiting_verification" && (
                                    <button
                                        type="button"
                                        onClick={handleVerify}
                                        className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                                    >
                                        Verifikasi FPB
                                    </button>
                                )}

                                {goodsReceipt.status === "verified" && (
                                    <button
                                        type="button"
                                        onClick={handleSendToQc}
                                        className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
                                    >
                                        Kirim ke QC
                                    </button>
                                )}

                                {goodsReceipt.status === "waiting_qc" && (
                                    <Link
                                        href={route(
                                            "quality-inspections.create",
                                            goodsReceipt.id,
                                        )}
                                        className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
                                    >
                                        Buat LHP
                                    </Link>
                                )}

                                <Link
                                    href={route("goods-receipts.index")}
                                    className="rounded-xl border-2 border-secondary-600 px-5 py-2.5 text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                                >
                                    Kembali
                                </Link>
                            </div>
                        </div>

                        {/* Informasi */}
                        <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-5 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-slate-400">
                                    Nomor FPB
                                </p>
                                <p className="font-semibold text-slate-800">
                                    {goodsReceipt.fpb_number}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-400">
                                    Supplier
                                </p>
                                <p className="font-semibold text-slate-800">
                                    {goodsReceipt.supplier?.name ?? "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-400">
                                    Tanggal Penerimaan
                                </p>
                                <p className="font-semibold text-slate-800">
                                    {goodsReceipt.received_date
                                        ? new Date(
                                              goodsReceipt.received_date,
                                          ).toLocaleDateString("id-ID", {
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric",
                                          })
                                        : "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-400">
                                    Diterima Oleh
                                </p>
                                <p className="font-semibold text-slate-800">
                                    {goodsReceipt.received_by?.name ?? "-"}
                                </p>
                            </div>
                        </div>

                        {/* Dokumen */}
                        <div className="mt-6 rounded-xl border border-slate-200 p-5">
                            <h2 className="text-lg font-bold text-slate-800">
                                Dokumen
                            </h2>

                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm text-slate-400">
                                        Surat Jalan
                                    </p>

                                    {goodsReceipt.surat_jalan_file ? (
                                        <a
                                            href={`/storage/${goodsReceipt.surat_jalan_file}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-semibold text-secondary-700 hover:underline"
                                        >
                                            Lihat Surat Jalan
                                        </a>
                                    ) : (
                                        <p className="text-sm text-slate-500">
                                            Belum ada file.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        COA
                                    </p>

                                    {goodsReceipt.coa_file ? (
                                        <a
                                            href={`/storage/${goodsReceipt.coa_file}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-semibold text-secondary-700 hover:underline"
                                        >
                                            Lihat COA
                                        </a>
                                    ) : (
                                        <p className="text-sm text-slate-500">
                                            Belum ada file.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Detail Barang */}
                        <div className="mt-8">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">
                                    Detail Barang
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Rincian barang yang diterima.
                                </p>
                            </div>

                            <div className="mt-3 overflow-hidden rounded-xl border border-slate-100">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-100 text-sm">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    No
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    Produk
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    Batch
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    MFG
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    EXP
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    Qty
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    UoM
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    Locator
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-slate-100 bg-white">
                                            {goodsReceipt.details.map(
                                                (detail, index) => (
                                                    <tr key={detail.id}>
                                                        <td className="px-4 py-3 text-slate-500">
                                                            {index + 1}
                                                        </td>

                                                        <td className="px-4 py-3 text-slate-700">
                                                            <div className="font-semibold">
                                                                {
                                                                    detail
                                                                        .product
                                                                        ?.name
                                                                }
                                                            </div>

                                                            <div className="text-xs text-slate-400">
                                                                {
                                                                    detail
                                                                        .product
                                                                        ?.product_code
                                                                }
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-3 text-slate-600">
                                                            {detail.batch_number ??
                                                                "-"}
                                                        </td>

                                                        <td className="px-4 py-3 text-slate-600">
                                                            {detail.mfg_date
                                                                ? new Date(
                                                                      detail.mfg_date,
                                                                  ).toLocaleDateString(
                                                                      "id-ID",
                                                                  )
                                                                : "-"}
                                                        </td>

                                                        <td className="px-4 py-3 text-slate-600">
                                                            {detail.exp_date
                                                                ? new Date(
                                                                      detail.exp_date,
                                                                  ).toLocaleDateString(
                                                                      "id-ID",
                                                                  )
                                                                : "-"}
                                                        </td>

                                                        <td className="px-4 py-3 font-semibold text-slate-800">
                                                            {detail.quantity}
                                                        </td>

                                                        <td className="px-4 py-3 text-slate-600">
                                                            {detail.uom?.code ??
                                                                "-"}
                                                        </td>

                                                        <td className="px-4 py-3 text-slate-600">
                                                            {detail.locator
                                                                ?.code ?? "-"}
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>

                                        <tfoot>
                                            <tr className="bg-slate-50 font-bold">
                                                <td
                                                    colSpan="5"
                                                    className="px-4 py-3 text-right text-slate-700"
                                                >
                                                    Total
                                                </td>

                                                <td className="px-4 py-3 text-slate-800">
                                                    {totalQuantity}
                                                </td>

                                                <td
                                                    colSpan="2"
                                                    className="px-4 py-3"
                                                />
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {goodsReceipt.description && (
                            <div className="mt-6 rounded-xl border border-slate-200 p-5">
                                <h2 className="text-lg font-bold text-slate-800">
                                    Keterangan
                                </h2>

                                <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
                                    {goodsReceipt.description}
                                </p>
                            </div>
                        )}

                        {/* Quality Inspection / LHP */}
                        <div className="mt-8">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">
                                    Quality Inspection / LHP
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Riwayat pemeriksaan kualitas barang yang
                                    diterima.
                                </p>
                            </div>

                            {qualityInspections.length === 0 ? (
                                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm text-slate-500">
                                        Belum ada Quality Inspection / LHP untuk
                                        FPB ini.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-4 space-y-4">
                                    {qualityInspections.map((inspection) => (
                                        <div
                                            key={inspection.id}
                                            className="rounded-xl border border-slate-200 bg-white p-5"
                                        >
                                            {/* Header LHP */}
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <h3 className="text-base font-bold text-slate-800">
                                                            {inspection.lhp_number ??
                                                                "-"}
                                                        </h3>

                                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                            Versi{" "}
                                                            {inspection.version_number ??
                                                                "-"}
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        Tanggal pemeriksaan:{" "}
                                                        {inspection.inspection_date
                                                            ? new Date(
                                                                  inspection.inspection_date,
                                                              ).toLocaleDateString(
                                                                  "id-ID",
                                                                  {
                                                                      day: "numeric",
                                                                      month: "long",
                                                                      year: "numeric",
                                                                  },
                                                              )
                                                            : "-"}
                                                    </p>
                                                </div>

                                                <div>
                                                    {inspection.head_quality_approval ? (
                                                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                            Disetujui Head
                                                            Quality
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                                            Menunggu Approval
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Data Pemeriksaan */}
                                            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                                <div className="rounded-lg bg-slate-50 p-4">
                                                    <p className="text-xs font-medium text-slate-400">
                                                        Diperiksa Oleh
                                                    </p>

                                                    <p className="mt-1 font-semibold text-slate-800">
                                                        {inspection.inspected_by
                                                            ?.name ?? "-"}
                                                    </p>
                                                </div>

                                                <div className="rounded-lg bg-slate-50 p-4">
                                                    <p className="text-xs font-medium text-slate-400">
                                                        Qty Surat Jalan
                                                    </p>

                                                    <p className="mt-1 font-semibold text-slate-800">
                                                        {inspection.qty_surat_jalan ??
                                                            "-"}
                                                    </p>
                                                </div>

                                                <div className="rounded-lg bg-slate-50 p-4">
                                                    <p className="text-xs font-medium text-slate-400">
                                                        Qty OK
                                                    </p>

                                                    <p className="mt-1 font-semibold text-slate-800">
                                                        {inspection.qty_ok ??
                                                            "-"}
                                                    </p>
                                                </div>

                                                <div className="rounded-lg bg-slate-50 p-4">
                                                    <p className="text-xs font-medium text-slate-400">
                                                        Approved By
                                                    </p>

                                                    <p className="mt-1 font-semibold text-slate-800">
                                                        {inspection.approved_by
                                                            ?.name ?? "-"}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Approval */}
                                            {inspection.head_quality_approval &&
                                                inspection.approved_at && (
                                                    <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                                                        <p className="text-xs font-medium text-green-600">
                                                            Waktu Approval
                                                        </p>

                                                        <p className="mt-1 font-semibold text-green-900">
                                                            {new Date(
                                                                inspection.approved_at,
                                                            ).toLocaleString(
                                                                "id-ID",
                                                            )}
                                                        </p>
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Verification Information */}
                        {goodsReceipt.status === "verified" && (
                            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
                                <h2 className="text-lg font-bold text-green-800">
                                    Informasi Verifikasi
                                </h2>

                                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm text-green-600">
                                            Diverifikasi Oleh
                                        </p>

                                        <p className="font-semibold text-green-900">
                                            {goodsReceipt.verified_by?.name ??
                                                "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-green-600">
                                            Waktu Verifikasi
                                        </p>

                                        <p className="font-semibold text-green-900">
                                            {goodsReceipt.verified_at
                                                ? new Date(
                                                      goodsReceipt.verified_at,
                                                  ).toLocaleString("id-ID")
                                                : "-"}
                                        </p>
                                    </div>

                                    {goodsReceipt.verification_notes && (
                                        <div className="md:col-span-2">
                                            <p className="text-sm text-green-600">
                                                Catatan Verifikasi
                                            </p>

                                            <p className="mt-1 whitespace-pre-line text-sm text-green-900">
                                                {
                                                    goodsReceipt.verification_notes
                                                }
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
