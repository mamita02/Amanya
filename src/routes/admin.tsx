// src/routes/admin.tsx

import { createFileRoute, useRouter, redirect } from "@tanstack/react-router";
import { BarChart3, Edit2, LogOut, Package, Plus, Settings, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import {
  createPerfume,
  deletePerfume,
  getAllPerfumes,
  getAllPerfumesForAdmin,
  updatePerfume,
  uploadPerfumeImage,
  type Category,
  type Perfume,
  type PerfumeFamily,
  type PerfumeInput,
} from "../lib/supabase";

export const Route = createFileRoute("/admin")({

  /* redirect to home  */
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  
  component: AdminLayout,
  head: () => ({
    meta: [{ title: "Dashboard Admin — AMANYA" }],
  }),
});

type AdminTab = "perfumes" | "stats" | "settings";

const PERFUME_FAMILIES: PerfumeFamily[] = [
  "Aquatique", "Aromatique", "Boisé", "Chypré", "Épicé", "Floral", "Fruité", "Oriental",
];

function AdminLayout() {
  const [activeTab, setActiveTab] = useState<AdminTab>("perfumes");

  const tabs: {
    id: AdminTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: "perfumes", label: "Gestion Parfums", icon: <Package className="w-5 h-5" /> },
    { id: "stats", label: "Statistiques", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "settings", label: "Paramètres", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ===== SIDEBAR NOIRE ===== */}
      <div className="w-64 text-white shadow-lg flex flex-col" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold" style={{ color: "#D4AF37" }}>AMANYA</h1>
          <p className="text-xs text-gray-400 mt-1">Dashboard Admin</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-semibold"
              style={
                activeTab === tab.id
                  ? { backgroundColor: "#D4AF37", color: "#1a1a1a" }
                  : { color: "#ccc" }
              }
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition"
            style={{ color: "#ccc" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(220, 20, 60, 0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* ===== CONTENU PRINCIPAL ===== */}
      <div className="flex-1 overflow-auto">
        {activeTab === "perfumes" && <AdminPerfumesView />}
        {activeTab === "stats" && <StatsView />}
        {activeTab === "settings" && <SettingsView />}
      </div>
    </div>
  );
}

// ===== GESTION DES PARFUMS =====
function AdminPerfumesView() {
  const router = useRouter();
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [hoverImageFile, setHoverImageFile] = useState<File | null>(null);
  const [hoverImagePreview, setHoverImagePreview] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    name: "",
    brand: "",
    subtitle: "",
    description: "",
    price: 20000,
    category: "homme" as Category,
    gender: "Homme",
    type: "Authentique",
    family: "Oriental",
    families: ["Oriental"] as PerfumeFamily[],
    badge: "",
    accent: "#1a1a1a",
    minQuantity: 25,
    isActive: true,
    volume: 100,
  });

  useEffect(() => {
    loadPerfumes();
  }, []);

  const loadPerfumes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllPerfumesForAdmin();
      setPerfumes(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const filteredPerfumes = perfumes.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const existingBrands = [...new Set(perfumes.map((perfume) => perfume.brand).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "fr"));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHoverImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => setHoverImagePreview(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({
      name: "",
      brand: "",
      subtitle: "",
      description: "",
      price: 20000,
      category: "homme",
      gender: "Homme",
      type: "Authentique",
      family: "Oriental",
      families: ["Oriental"],
      badge: "",
      accent: "#1a1a1a",
      minQuantity: 25,
      isActive: true,
      volume: 100,
    });
    setImageFile(null);
    setImagePreview("");
    setHoverImageFile(null);
    setHoverImagePreview("");
    setEditingId(null);
    setSubmitError("");
  };

  const handleEdit = (perfume: Perfume) => {
    setForm({
      name: perfume.name,
      brand: perfume.brand,
      subtitle: perfume.subtitle,
      description: perfume.description || "",
      price: perfume.price,
      category: perfume.category,
      gender: perfume.gender,
      type: perfume.type,
      family: perfume.family,
      families: perfume.families?.length ? perfume.families : [perfume.family],
      badge: perfume.badge || "",
      accent: perfume.accent,
      minQuantity: perfume.minQuantity as number,
      isActive: perfume.isActive,
      volume: perfume.volumes?.[0] || 100,
    });
    setImagePreview(perfume.image);
    setHoverImagePreview(perfume.hoverImage || "");
    setEditingId(perfume.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      if (!form.name.trim()) throw new Error("Le nom est requis");
      if (!form.brand.trim()) throw new Error("La marque est requise");
      if (!form.families.length) throw new Error("Sélectionnez au moins une famille");
      if (!imagePreview && !imageFile) throw new Error("Veuillez sélectionner une image");

      let imageUrl = imagePreview;
      if (imageFile) {
        imageUrl = await uploadPerfumeImage(imageFile, form.category, form.name);
      }

      let hoverImageUrl = hoverImagePreview;
      if (hoverImageFile) {
        hoverImageUrl = await uploadPerfumeImage(hoverImageFile, form.category, `${form.name}-survol`);
      }

      const perfumeData: PerfumeInput = {
        name: form.name,
        brand: form.brand,
        subtitle: form.subtitle || `${form.volume}ml - Eau de Parfum`,
        description: form.description,
        price: form.price,
        category: form.category,
        gender: form.gender as any,
        type: form.type as any,
        family: form.family as any,
        families: form.families,
        image: imageUrl,
        hoverImage: hoverImageUrl || undefined,
        badge: form.badge || undefined,
        accent: form.accent,
        volumes: [form.volume as 50 | 100],
        minQuantity: form.minQuantity as any,
        isActive: form.isActive,
      };

      if (editingId) {
        await updatePerfume(editingId, perfumeData);
      } else {
        await createPerfume(perfumeData);
      }

      resetForm();
      setShowForm(false);
      await loadPerfumes();
      await router.invalidate();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer "${name}"?`)) return;

    try {
      await deletePerfume(id);
      setPerfumes(perfumes.filter((p) => p.id !== id));
      await router.invalidate();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      setError(msg);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gestion des Parfums</h2>
          <p className="text-gray-600 mt-1">
            Total: <span className="font-bold text-gray-900">{perfumes.length}</span> parfums
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 text-white px-6 py-3 rounded-lg font-semibold transition hover:opacity-90"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          <Plus className="w-5 h-5" />
          Ajouter Parfum
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg text-white" style={{ backgroundColor: "#DC143C" }}>
          {error}
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un parfum ou une marque..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: "#1a1a1a", borderTopColor: "#D4AF37" }}></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      ) : filteredPerfumes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-600 mb-4">Aucun parfum trouvé</p>
          {!searchTerm && (
            <button onClick={() => { resetForm(); setShowForm(true); }} className="text-white px-6 py-2 rounded-lg transition hover:opacity-90" style={{ backgroundColor: "#1a1a1a" }}>
              Ajouter le premier parfum
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Parfum</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Marque</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Catégorie</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Volume</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Prix</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Disponibilité</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPerfumes.map((perfume) => (
                <tr key={perfume.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={perfume.image}
                        alt={perfume.name}
                        className="w-10 h-10 rounded object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/40?text=?"; }}
                      />
                      <div>
                        <p className="font-semibold text-sm">{perfume.name}</p>
                        <p className="text-xs text-gray-600">{perfume.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{perfume.brand}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="bg-gray-200 px-3 py-1 rounded text-xs font-semibold">
                      {perfume.category === "homme" ? "Parfum Authentique Homme" : perfume.category === "femme" ? "Parfum Authentique Femme" : perfume.category === "diffuseur" ? "Diffuseur" : perfume.category === "prestige-homme" ? "Prestige Homme" : "Prestige Femme"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className="px-2 py-1 rounded text-xs font-bold"
                      style={{
                        backgroundColor: perfume.volumes?.[0] === 50 ? "rgba(212,175,55,0.15)" : "rgba(26,26,26,0.1)",
                        color: perfume.volumes?.[0] === 50 ? "#B8941E" : "#1a1a1a",
                      }}
                    >
                      {perfume.volumes?.[0] || 100} ml
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {perfume.price.toLocaleString("fr-FR")} XOF
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className="px-2 py-1 rounded text-xs font-semibold"
                      style={{
                        backgroundColor: perfume.isActive ? "#d4edda" : "#f8d7da",
                        color: perfume.isActive ? "#155724" : "#856404",
                      }}
                    >
                      {perfume.isActive ? "Oui" : "Non"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(perfume)}
                      className="p-2 rounded transition"
                      style={{ color: "#D4AF37" }}
                      title="Modifier"
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(perfume.id, perfume.name)}
                      className="p-2 rounded transition"
                      style={{ color: "#DC143C" }}
                      title="Supprimer"
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(220, 20, 60, 0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Formulaire */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingId ? "Modifier le Parfum" : "Ajouter un Parfum"}
              </h3>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="text-2xl text-gray-500 hover:text-red-500">×</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {submitError && (
                <div className="p-4 rounded text-white text-sm" style={{ backgroundColor: "#DC143C" }}>{submitError}</div>
              )}

              {/* VOLUME — en premier pour que le prix s'ajuste */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900">Volume *</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, volume: 50, price: 3500, minQuantity: 20 })}
                    className="flex-1 py-3 rounded-xl text-sm font-bold border-2 transition"
                    style={
                      form.volume === 50
                        ? { borderColor: "#D4AF37", backgroundColor: "rgba(212,175,55,0.1)", color: "#B8941E" }
                        : { borderColor: "#e5e7eb", color: "#666" }
                    }
                  >
                    50 ml
                    <span className="block text-xs font-normal mt-1" style={{ color: form.volume === 50 ? "#B8941E" : "#999" }}>
                      3 500 FCFA · Min. 20 pcs
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, volume: 100, price: 20000, minQuantity: 25 })}
                    className="flex-1 py-3 rounded-xl text-sm font-bold border-2 transition"
                    style={
                      form.volume === 100
                        ? { borderColor: "#D4AF37", backgroundColor: "rgba(212,175,55,0.1)", color: "#B8941E" }
                        : { borderColor: "#e5e7eb", color: "#666" }
                    }
                  >
                    100 ml
                    <span className="block text-xs font-normal mt-1" style={{ color: form.volume === 100 ? "#B8941E" : "#999" }}>
                      20 000 FCFA · Min. 25 pcs
                    </span>
                  </button>
                </div>
              </div>

              {/* PHOTOS */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center bg-gray-50">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" required={!imagePreview} />
                  <label htmlFor="image-upload" className="cursor-pointer block">
                    {imagePreview ? <img src={imagePreview} alt="Aperçu principal" className="w-32 h-32 mx-auto rounded mb-3 object-cover" /> : <Upload className="w-10 h-10 mx-auto mb-2" style={{ color: "#D4AF37" }} />}
                    <p className="text-sm font-semibold text-gray-900">Photo principale *</p>
                    <p className="text-xs text-gray-600 mt-1">Visible directement · JPG, PNG (max 5MB)</p>
                  </label>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center bg-gray-50">
                  <input type="file" accept="image/*" onChange={handleHoverImageChange} className="hidden" id="hover-image-upload" />
                  <label htmlFor="hover-image-upload" className="cursor-pointer block">
                    {hoverImagePreview ? <img src={hoverImagePreview} alt="Aperçu au survol" className="w-32 h-32 mx-auto rounded mb-3 object-cover" /> : <Upload className="w-10 h-10 mx-auto mb-2" style={{ color: "#D4AF37" }} />}
                    <p className="text-sm font-semibold text-gray-900">Photo au survol</p>
                    <p className="text-xs text-gray-600 mt-1">Optionnelle · affichage temporaire</p>
                  </label>
                </div>
              </div>

              {/* Nom et Marque */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Nom *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="ex: Sauvage 50ml" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Marque *</label>
                  <input type="text" list="existing-brands" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Saisir ou choisir une marque" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" required />
                  <datalist id="existing-brands">{existingBrands.map((brand) => <option key={brand} value={brand} />)}</datalist>
                </div>
              </div>

              {/* Sous-titre et Badge */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Sous-titre</label>
                  <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder={`Auto: ${form.volume}ml - Eau de Parfum`} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Badge</label>
                  <input type="text" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="ex: NEW, BEST" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Décrivez le parfum..." rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none resize-none" />
              </div>

              {/* Prix et Catégorie */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Prix (FCFA) *</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" min="1" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Catégorie *</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" required>
                    <option value="diffuseur">Diffuseur</option>
                    <option value="femme">Parfum Authentique Femme</option>
                    <option value="homme">Parfum Authentique Homme</option>
                    <option value="prestige-homme">Prestige Homme</option>
                    <option value="prestige-femme">Prestige Femme</option>
                  </select>
                </div>
              </div>

              {/* Genre et Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Genre *</label>
                  <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" required>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                    <option value="Unisexe">Unisexe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Type *</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" required>
                    <option value="Authentique">Authentique</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
              </div>

              {/* Famille et Accent */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Famille *</label>
                  <div className="grid grid-cols-2 gap-2 border border-gray-300 p-3">
                    {PERFUME_FAMILIES.map((family) => (
                      <label key={family} className="flex items-center gap-2 text-sm font-normal">
                        <input
                          type="checkbox"
                          checked={form.families.includes(family)}
                          onChange={() => {
                            const selected = form.families.includes(family)
                              ? form.families.filter((item) => item !== family)
                              : [...form.families, family];
                            setForm({ ...form, families: selected, family: selected[0] || "Oriental" });
                          }}
                        />
                        {family}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Couleur Accent</label>
                  <input type="color" value={form.accent} onChange={(e) => setForm({ ...form, accent: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" />
                </div>
              </div>

              {/* Min Quantity et disponibilité */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Quantité Min.</label>
                  <input type="number" value={form.minQuantity} onChange={(e) => setForm({ ...form, minQuantity: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Disponibilité</label>
                  <select value={form.isActive ? "oui" : "non"} onChange={(e) => setForm({ ...form, isActive: e.target.value === "oui" })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none">
                    <option value="oui">Oui</option>
                    <option value="non">Non</option>
                  </select>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-4 pt-6 border-t">
                <button type="submit" disabled={submitting} className="flex-1 text-white py-2 rounded-lg font-semibold transition hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: "#1a1a1a" }}>
                  {submitting ? "Enregistrement..." : editingId ? "Modifier" : "Ajouter"}
                </button>
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== STATISTIQUES RÉELLES =====
function StatsView() {
  const [stats, setStats] = useState({
    totalPerfumes: 0,
    homme: 0,
    femme: 0,
    diffuseur: 0,
    homme50: 0,
    homme100: 0,
    femme50: 0,
    femme100: 0,
    authentique: 0,
    standard: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const perfumes = await getAllPerfumes();
        setStats({
          totalPerfumes: perfumes.length,
          homme: perfumes.filter(p => p.category === 'homme').length,
          femme: perfumes.filter(p => p.category === 'femme').length,
          diffuseur: perfumes.filter(p => p.category === 'diffuseur').length,
          homme50: perfumes.filter(p => p.category === 'homme' && p.volumes?.[0] === 50).length,
          homme100: perfumes.filter(p => p.category === 'homme' && p.volumes?.[0] === 100).length,
          femme50: perfumes.filter(p => p.category === 'femme' && p.volumes?.[0] === 50).length,
          femme100: perfumes.filter(p => p.category === 'femme' && p.volumes?.[0] === 100).length,
          authentique: perfumes.filter(p => p.type === 'Authentique').length,
          standard: perfumes.filter(p => p.type === 'Standard').length,
        });
      } catch (error) {
        console.error('Erreur chargement stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: "#1a1a1a", borderTopColor: "#D4AF37" }}></div>
        <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
      </div>
    );
  }

  const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
    <div className="bg-white p-6 rounded-lg shadow border-l-4" style={{ borderLeftColor: color }}>
      <p className="text-gray-600 text-sm font-semibold">{title}</p>
      <p className="text-4xl font-bold mt-3" style={{ color }}>{value}</p>
    </div>
  );

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Statistiques</h2>

      <div className="mb-8 bg-white p-8 rounded-lg shadow border-l-4" style={{ borderLeftColor: "#D4AF37" }}>
        <p className="text-gray-600 text-sm font-semibold">TOTAL PARFUMS</p>
        <p className="text-6xl font-bold mt-4" style={{ color: "#D4AF37" }}>{stats.totalPerfumes}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard title="Parfums Homme" value={stats.homme} color="#1a1a1a" />
        <StatCard title="Parfums Femme" value={stats.femme} color="#DC143C" />
        <StatCard title="Diffuseurs" value={stats.diffuseur} color="#D4AF37" />
      </div>

      {/* Détail par volume */}
      <h3 className="text-xl font-bold mb-4 text-gray-900">Détail par volume</h3>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Homme 50ml" value={stats.homme50} color="#B8941E" />
        <StatCard title="Homme 100ml" value={stats.homme100} color="#1a1a1a" />
        <StatCard title="Femme 50ml" value={stats.femme50} color="#E91E63" />
        <StatCard title="Femme 100ml" value={stats.femme100} color="#DC143C" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StatCard title="Authentique" value={stats.authentique} color="#27AE60" />
        <StatCard title="Standard" value={stats.standard} color="#3498DB" />
      </div>
    </div>
  );
}

// ===== PARAMÈTRES =====
function SettingsView() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Paramètres</h2>
      <div className="max-w-2xl bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Nom du site</label>
            <input type="text" defaultValue="AMANYA" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Email de contact</label>
            <input type="email" defaultValue="contact@amanya-distribution.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
          </div>
          <button className="text-white px-6 py-2 rounded-lg transition hover:opacity-90 font-semibold" style={{ backgroundColor: "#1a1a1a" }}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
