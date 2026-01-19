"use client";
import React, { useState } from 'react';
import { Package, Plus, Trash2, Save } from 'lucide-react';

export default function UrunYonetimi() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("PLT Serisi");
    const [specs, setSpecs] = useState([{ label: "", value: "" }]);

    const addSpec = () => setSpecs([...specs, { label: "", value: "" }]);

    const handleSave = async () => {
        const productData = { title, category, specs };
        const res = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify(productData),
            headers: { "Content-Type": "application/json" }
        });
        if (res.ok) alert("Ürün başarıyla eklendi!");
    };

    return (
        <div className="p-8 text-slate-900">
            <h1 className="text-3xl font-black italic uppercase mb-8">Ürün <span className="text-amber-600">Yönetimi</span></h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 font-sans">
                {/* Form Alanı */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
                    <div>
                        <label className="text-xs font-black uppercase text-slate-400 block mb-2">Ürün Adı</label>
                        <input onChange={e => setTitle(e.target.value)} type="text" className="w-full bg-slate-50 border p-4 rounded-2xl outline-none focus:border-amber-500" placeholder="Örn: PLT-18 Mini Ekskavatör" />
                    </div>

                    <div>
                        <label className="text-xs font-black uppercase text-slate-400 block mb-2">Teknik Özellikler</label>
                        {specs.map((spec, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input placeholder="Örn: Ağırlık" className="w-1/2 bg-slate-50 border p-3 rounded-xl text-sm"
                                    onChange={e => {
                                        const newSpecs = [...specs];
                                        newSpecs[index].label = e.target.value;
                                        setSpecs(newSpecs);
                                    }}
                                />
                                <input placeholder="Örn: 900 kg" className="w-1/2 bg-slate-50 border p-3 rounded-xl text-sm"
                                    onChange={e => {
                                        const newSpecs = [...specs];
                                        newSpecs[index].value = e.target.value;
                                        setSpecs(newSpecs);
                                    }}
                                />
                            </div>
                        ))}
                        <button onClick={addSpec} className="text-amber-600 text-xs font-black uppercase mt-2 flex items-center gap-1">
                            <Plus size={14} /> Özellik Ekle
                        </button>
                    </div>

                    <button onClick={handleSave} className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-amber-600 transition-all flex items-center justify-center gap-2">
                        <Save size={20} /> ÜRÜNÜ KAYDET
                    </button>
                </div>

                {/* Önizleme veya Liste Alanı buraya gelebilir */}
            </div>
        </div>
    );
}