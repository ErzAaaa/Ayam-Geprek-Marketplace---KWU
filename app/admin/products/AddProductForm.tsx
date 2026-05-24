"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { createProduct } from "@/app/actions/products";

export function AddProductForm({ vendorId }: { vendorId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct(vendorId, {
      name,
      description,
      price: parseInt(price),
    });
    setIsOpen(false);
    setName("");
    setDescription("");
    setPrice("");
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg"
      >
        <Plus className="w-5 h-5" /> Tambah Menu
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-xl">Tambah Menu Baru</h3>
          <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-zinc-500 mb-1 block">Nama Menu</label>
            <input 
              required
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-medium outline-none focus:border-primary"
              placeholder="Cth: Ayam Geprek Sambal Bawang"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-zinc-500 mb-1 block">Deskripsi</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-medium outline-none focus:border-primary"
              placeholder="Deskripsi singkat..."
              rows={3}
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-zinc-500 mb-1 block">Harga (Rp)</label>
            <input 
              required
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-medium outline-none focus:border-primary"
              placeholder="15000"
            />
          </div>
          <div className="pt-2">
            <button 
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Simpan Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
