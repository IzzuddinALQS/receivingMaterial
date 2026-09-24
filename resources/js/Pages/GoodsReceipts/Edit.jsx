import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({
    goodsReceipt,
    suppliers,
    purchaseOrders,
    products,
    uoms,
    locaters,
}) {
    const { data, setData, put, processing, errors } = useForm({
        fpb_number: goodsReceipt.fpb_number ?? "",
        purchase_order_id: goodsReceipt.purchase_order_id ?? "",
        supplier_id: goodsReceipt.supplier_id ?? "",
        received_date: goodsReceipt.received_date
            ? goodsReceipt.received_date.substring(0, 10)
            : "",
        received_by: goodsReceipt.received_by ?? "",
        description: goodsReceipt.description ?? "",
        surat_jalan_file: null,
        coa_file: null,

        details:
            goodsReceipt.details?.length > 0
                ? goodsReceipt.details.map((detail) => ({
                      id: detail.id,
                      product_id: detail.product_id ?? "",
                      batch_number: detail.batch_number ?? "",
                      mfg_date: detail.mfg_date
                          ? detail.mfg_date.substring(0, 10)
                          : "",
                      exp_date: detail.exp_date
                          ? detail.exp_date.substring(0, 10)
                          : "",
                      quantity: detail.quantity ?? 1,
                      uom_id: detail.uom_id ?? "",
                      locator_id: detail.locator_id ?? "",
                      description: detail.description ?? "",
                  }))
                : [
                      {
                          id: null,
                          product_id: "",
                          batch_number: "",
                          mfg_date: "",
                          exp_date: "",
                          quantity: 1,
                          uom_id: "",
                          locator_id: "",
                          description: "",
                      },
                  ],
    });

    const updateDetail = (index, field, value) => {
        const newDetails = [...data.details];

        newDetails[index] = {
            ...newDetails[index],
            [field]: value,
        };

        setData("details", newDetails);
    };

    const addDetail = () => {
        setData("details", [
            ...data.details,
            {
                id: null,
                product_id: "",
                batch_number: "",
                mfg_date: "",
                exp_date: "",
                quantity: 1,
                uom_id: "",
                locator_id: "",
                description: "",
            },
        ]);
    };

    const removeDetail = (index) => {
        if (data.details.length === 1) {
            return;
        }

        const newDetails = data.details.filter(
            (_, detailIndex) => detailIndex !== index,
        );

        setData("details", newDetails);
    };

    const handlePurchaseOrderChange = (value) => {
        const selectedPo = purchaseOrders.find(
            (po) => String(po.id) === String(value),
        );

        setData((currentData) => ({
            ...currentData,
            purchase_order_id: value,
            supplier_id: selectedPo ? String(selectedPo.supplier_id) : "",
        }));
    };

    const submit = (e) => {
        e.preventDefault();

        put(route("goods-receipts.update", goodsReceipt.id), {
            forceFormData: true,
        });
    };

    const inputClass =
        "mt-1.5 w-full rounded-xl border-slate-200 py-2.5 shadow-sm focus:border-accent-500 focus:ring-accent-500";

    return (
        <AuthenticatedLayout>
            <Head title={`Edit ${goodsReceipt.fpb_number}`} />

            <div className="py-8">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-slate-800">
                                Edit FPB
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Perbarui data penerimaan barang.
                            </p>
                        </div>

                        <form onSubmit={submit}>
                            {/* Informasi FPB */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                <h2 className="text-lg font-bold text-slate-800">
                                    Informasi Penerimaan
                                </h2>

                                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {/* FPB Number */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Nomor FPB
                                        </label>

                                        <input
                                            type="text"
                                            value={data.fpb_number}
                                            onChange={(e) =>
                                                setData(
                                                    "fpb_number",
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClass}
                                        />

                                        {errors.fpb_number && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.fpb_number}
                                            </p>
                                        )}
                                    </div>

                                    {/* Purchase Order */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Purchase Order
                                        </label>

                                        <select
                                            value={data.purchase_order_id}
                                            onChange={(e) =>
                                                handlePurchaseOrderChange(
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            <option value="">
                                                Pilih Purchase Order
                                            </option>

                                            {purchaseOrders.map((po) => (
                                                <option
                                                    key={po.id}
                                                    value={po.id}
                                                >
                                                    {po.po_number} -{" "}
                                                    {po.supplier?.name ?? ""}
                                                </option>
                                            ))}
                                        </select>

                                        {errors.purchase_order_id && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.purchase_order_id}
                                            </p>
                                        )}
                                    </div>

                                    {/* Supplier */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Supplier
                                        </label>

                                        <select
                                            value={data.supplier_id}
                                            disabled={!!data.purchase_order_id}
                                            onChange={(e) =>
                                                setData(
                                                    "supplier_id",
                                                    e.target.value,
                                                )
                                            }
                                            className={`${inputClass} disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500`}
                                        >
                                            <option value="">
                                                Pilih Supplier
                                            </option>

                                            {suppliers.map((supplier) => (
                                                <option
                                                    key={supplier.id}
                                                    value={supplier.id}
                                                >
                                                    {supplier.name}
                                                </option>
                                            ))}
                                        </select>

                                        {data.purchase_order_id && (
                                            <p className="mt-1 text-xs text-slate-500">
                                                Supplier mengikuti Purchase
                                                Order.
                                            </p>
                                        )}

                                        {errors.supplier_id && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.supplier_id}
                                            </p>
                                        )}
                                    </div>

                                    {/* Tanggal */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Tanggal Penerimaan
                                        </label>

                                        <input
                                            type="date"
                                            value={data.received_date}
                                            onChange={(e) =>
                                                setData(
                                                    "received_date",
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClass}
                                        />

                                        {errors.received_date && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.received_date}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Dokumen */}
                            <div className="mt-6 rounded-xl border border-slate-200 p-5">
                                <h2 className="text-lg font-bold text-slate-800">
                                    Dokumen Penerimaan
                                </h2>

                                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Ganti Surat Jalan
                                        </label>

                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) =>
                                                setData(
                                                    "surat_jalan_file",
                                                    e.target.files[0] ?? null,
                                                )
                                            }
                                            className={inputClass}
                                        />

                                        <p className="mt-1 text-xs text-slate-500">
                                            Kosongkan jika tidak ingin mengganti
                                            file.
                                        </p>

                                        {goodsReceipt.surat_jalan_file && (
                                            <p className="mt-1 text-xs text-green-600">
                                                File surat jalan sudah
                                                tersimpan.
                                            </p>
                                        )}

                                        {errors.surat_jalan_file && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.surat_jalan_file}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Ganti COA
                                        </label>

                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) =>
                                                setData(
                                                    "coa_file",
                                                    e.target.files[0] ?? null,
                                                )
                                            }
                                            className={inputClass}
                                        />

                                        <p className="mt-1 text-xs text-slate-500">
                                            Kosongkan jika tidak ingin mengganti
                                            file.
                                        </p>

                                        {goodsReceipt.coa_file && (
                                            <p className="mt-1 text-xs text-green-600">
                                                File COA sudah tersimpan.
                                            </p>
                                        )}

                                        {errors.coa_file && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.coa_file}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Detail Barang */}
                            <div className="mt-6 rounded-xl bg-slate-50 p-5">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-800">
                                            Detail Barang
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            Perbarui barang yang diterima,
                                            batch, MFG, EXP, quantity, UoM, dan
                                            lokasi.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={addDetail}
                                        className="rounded-xl bg-secondary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-secondary-700"
                                    >
                                        + Tambah Barang
                                    </button>
                                </div>

                                <div className="mt-5 space-y-5">
                                    {data.details.map((detail, index) => (
                                        <div
                                            key={detail.id ?? `new-${index}`}
                                            className="rounded-xl border border-slate-200 bg-white p-5"
                                        >
                                            <div className="mb-4 flex items-center justify-between">
                                                <h3 className="font-bold text-slate-700">
                                                    Barang #{index + 1}
                                                </h3>

                                                {data.details.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeDetail(index)
                                                        }
                                                        className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                                                    >
                                                        Hapus
                                                    </button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                {/* Product */}
                                                <div className="lg:col-span-2">
                                                    <label className="block text-sm font-semibold text-slate-700">
                                                        Produk
                                                    </label>

                                                    <select
                                                        value={
                                                            detail.product_id
                                                        }
                                                        onChange={(e) =>
                                                            updateDetail(
                                                                index,
                                                                "product_id",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={inputClass}
                                                    >
                                                        <option value="">
                                                            Pilih Produk
                                                        </option>

                                                        {products.map(
                                                            (product) => (
                                                                <option
                                                                    key={
                                                                        product.id
                                                                    }
                                                                    value={
                                                                        product.id
                                                                    }
                                                                >
                                                                    {
                                                                        product.product_code
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        product.name
                                                                    }
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>

                                                    {errors[
                                                        `details.${index}.product_id`
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `details.${index}.product_id`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Batch */}
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700">
                                                        Batch Number
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={
                                                            detail.batch_number
                                                        }
                                                        onChange={(e) =>
                                                            updateDetail(
                                                                index,
                                                                "batch_number",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={inputClass}
                                                    />

                                                    {errors[
                                                        `details.${index}.batch_number`
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `details.${index}.batch_number`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {/* MFG */}
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700">
                                                        Tanggal MFG
                                                    </label>

                                                    <input
                                                        type="date"
                                                        value={detail.mfg_date}
                                                        onChange={(e) =>
                                                            updateDetail(
                                                                index,
                                                                "mfg_date",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={inputClass}
                                                    />

                                                    {errors[
                                                        `details.${index}.mfg_date`
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `details.${index}.mfg_date`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {/* EXP */}
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700">
                                                        Tanggal EXP
                                                    </label>

                                                    <input
                                                        type="date"
                                                        value={detail.exp_date}
                                                        onChange={(e) =>
                                                            updateDetail(
                                                                index,
                                                                "exp_date",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={inputClass}
                                                    />

                                                    {errors[
                                                        `details.${index}.exp_date`
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `details.${index}.exp_date`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Quantity */}
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700">
                                                        Quantity
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="0.001"
                                                        step="0.001"
                                                        value={detail.quantity}
                                                        onChange={(e) =>
                                                            updateDetail(
                                                                index,
                                                                "quantity",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={inputClass}
                                                    />

                                                    {errors[
                                                        `details.${index}.quantity`
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `details.${index}.quantity`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {/* UOM */}
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700">
                                                        UoM
                                                    </label>

                                                    <select
                                                        value={detail.uom_id}
                                                        onChange={(e) =>
                                                            updateDetail(
                                                                index,
                                                                "uom_id",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={inputClass}
                                                    >
                                                        <option value="">
                                                            Pilih UoM
                                                        </option>

                                                        {uoms.map((uom) => (
                                                            <option
                                                                key={uom.id}
                                                                value={uom.id}
                                                            >
                                                                {uom.code} -{" "}
                                                                {uom.name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {errors[
                                                        `details.${index}.uom_id`
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `details.${index}.uom_id`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Locator */}
                                                <div className="lg:col-span-2">
                                                    <label className="block text-sm font-semibold text-slate-700">
                                                        Locator / Lokasi
                                                    </label>

                                                    <select
                                                        value={
                                                            detail.locator_id
                                                        }
                                                        onChange={(e) =>
                                                            updateDetail(
                                                                index,
                                                                "locator_id",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={inputClass}
                                                    >
                                                        <option value="">
                                                            Pilih Lokasi
                                                        </option>

                                                        {locaters.map(
                                                            (locator) => (
                                                                <option
                                                                    key={
                                                                        locator.id
                                                                    }
                                                                    value={
                                                                        locator.id
                                                                    }
                                                                >
                                                                    {
                                                                        locator.code
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        locator.warehouse_name
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        locator.area_rack
                                                                    }
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>

                                                    {errors[
                                                        `details.${index}.locator_id`
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `details.${index}.locator_id`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Description */}
                                                <div className="lg:col-span-3">
                                                    <label className="block text-sm font-semibold text-slate-700">
                                                        Keterangan Barang
                                                    </label>

                                                    <textarea
                                                        value={
                                                            detail.description
                                                        }
                                                        onChange={(e) =>
                                                            updateDetail(
                                                                index,
                                                                "description",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={inputClass}
                                                        rows="2"
                                                    />

                                                    {errors[
                                                        `details.${index}.description`
                                                    ] && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {
                                                                errors[
                                                                    `details.${index}.description`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Keterangan */}
                            <div className="mt-6">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Keterangan Penerimaan
                                </label>

                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className={inputClass}
                                    rows="3"
                                />

                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="mt-8 flex items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-700 disabled:opacity-40"
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Perubahan"}
                                </button>

                                <Link
                                    href={route("goods-receipts.index")}
                                    className="rounded-xl border-2 border-secondary-600 px-6 py-3 text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                                >
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
