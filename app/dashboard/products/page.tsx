"use client";
import { useState, useEffect } from "react";
import { Package, Plus, Search, Trash2, X, Loader2, ShoppingBag } from "lucide-react";
import { createProduct, getProducts, deleteProduct } from "@/app/actions/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [newProduct, setNewProduct] = useState({ name: "", price: "", currency: "KES" });

  // 1. Load Products
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  // 2. Add Product
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createProduct(newProduct.name, parseFloat(newProduct.price), newProduct.currency);
      setIsModalOpen(false);
      setNewProduct({ name: "", price: "", currency: "KES" }); // Reset form
      loadData(); // Refresh list
    } catch (e) {
      alert("Error creating product");
    }
    setSaving(false);
  };

  // 3. Delete Product
  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you want to delete this product?")) return;
    try {
        setProducts(products.filter(p => p.id !== id)); // Optimistic update
        await deleteProduct(id);
    } catch(e) {
        loadData(); // Revert on error
    }
  };

  return (
    <div className="p-8 text-white min-h-screen relative">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold mb-1">Products</h1>
            <p className="text-gray-400">Manage your digital assets and pricing.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/20"
        >
          <Plus size={20} /> New Product
        </button>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="flex justify-center py-20 text-blue-500">
            <Loader2 className="animate-spin" size={40} />
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && products.length === 0 && (
        <div className="bg-gray-900/50 border border-gray-800 border-dashed rounded-2xl p-16 text-center">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={40} className="text-gray-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No products found</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
             Start by adding a digital course, ebook, or service.
          </p>
          <button onClick={() => setIsModalOpen(true)} className="text-blue-400 font-bold hover:text-blue-300 hover:underline transition">
            + Create your first product
          </button>
        </div>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
            <div key={product.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition group relative">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                        <ShoppingBag size={24} />
                    </div>
                    <button onClick={() => handleDelete(product.id)} className="text-gray-600 hover:text-red-500 transition">
                        <Trash2 size={18} />
                    </button>
                </div>
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-2xl font-bold text-green-400">{product.currency} {product.price}</p>
                <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between text-sm text-gray-500">
                    <span>Digital Item</span>
                    <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-white"
                >
                    <X size={20} />
                </button>
                
                <h2 className="text-xl font-bold mb-6">Add New Product</h2>
                
                <form onSubmit={handleCreate} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Product Name</label>
                        <input 
                            required
                            autoFocus
                            className="w-full bg-black border border-gray-800 rounded-lg p-3 outline-none focus:border-blue-500 transition text-white"
                            placeholder="e.g. Masterclass 2025"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Price</label>
                            <input 
                                required
                                type="number"
                                className="w-full bg-black border border-gray-800 rounded-lg p-3 outline-none focus:border-green-500 transition text-white"
                                placeholder="5000"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Currency</label>
                            <select 
                                className="w-full bg-black border border-gray-800 rounded-lg p-3 outline-none focus:border-blue-500 transition text-white"
                                value={newProduct.currency}
                                onChange={(e) => setNewProduct({...newProduct, currency: e.target.value})}
                            >
                                <option value="KES">KES (Shilling)</option>
                                <option value="USD">USD (Dollar)</option>
                                <option value="NGN">NGN (Naira)</option>
                                <option value="ZAR">ZAR (Rand)</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        disabled={saving}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl mt-4 flex items-center justify-center gap-2 transition"
                    >
                        {saving ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
                        {saving ? "Saving..." : "Create Product"}
                    </button>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}