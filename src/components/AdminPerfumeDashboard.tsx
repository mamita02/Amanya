// src/components/AdminPerfumesDashboard.tsx
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
    createPerfume,
    deletePerfume,
    getAllPerfumes,
    type Category,
    type Perfume
} from "../lib/supabase";

export function AdminPerfumesDashboard() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  // État du formulaire
  const [form, setForm] = useState({
    name: "",
    brand: "",
    subtitle: "",
    price: 20000,
    category: "homme" as Category,
    gender: "Homme",
    type: "Authentique",
    family: "Oriental",
    image: "https://via.placeholder.com/300x400?text=Parfum",
    accent: "#1a1a1a",
  });

  // Charger les parfums au montage
  useEffect(() => {
    loadPerfumes();
  }, []);

  const loadPerfumes = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("📍 Chargement des parfums...");

      const data = await getAllPerfumes();
      console.log(`✅ ${data.length} parfums chargés`);

      setPerfumes(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      console.error("❌ Erreur:", msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      if (!form.name.trim()) throw new Error("Le nom est requis");
      if (!form.brand.trim()) throw new Error("La marque est requise");

      console.log("📍 Création du parfum:", form.name);

      await createPerfume({
        name: form.name,
        brand: form.brand,
        subtitle: form.subtitle,
        price: form.price,
        category: form.category,
        gender: form.gender as any,
        type: form.type as any,
        family: form.family as any,
        image: form.image,
        accent: form.accent,
        volumes: [50, 100],
        minQuantity: 25,
        isActive: true,
      });

      console.log("✅ Parfum créé avec succès");

      // Réinitialiser le formulaire
      setForm({
        name: "",
        brand: "",
        subtitle: "",
        price: 20000,
        category: "homme",
        gender: "Homme",
        type: "Authentique",
        family: "Oriental",
        image: "https://via.placeholder.com/300x400?text=Parfum",
        accent: "#1a1a1a",
      });

      setShowForm(false);
      await loadPerfumes();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      console.error("❌ Erreur création:", msg);
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer "${name}"?`)) return;

    try {
      console.log("📍 Suppression du parfum:", id);
      await deletePerfume(id);
      console.log("✅ Parfum supprimé");

      setPerfumes(perfumes.filter((p) => p.id !== id));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      console.error("❌ Erreur suppression:", msg);
      setError(msg);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Gestion des Parfums</h2>
          <p className="text-gray-600 mt-1">
            Total: <span className="font-bold text-gray-900">{perfumes.length}</span> parfums
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-onyx text-white px-6 py-3 rounded-lg hover:bg-ruby transition font-semibold"
        >
          <Plus className="w-5 h-5" />
          Ajouter Parfum
        </button>
      </div>

      {/* Erreur globale */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          ❌ {error}
        </div>
      )}

      {/* État de chargement */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-onyx border-t-gold rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      ) : perfumes.length === 0 ? (
        /* Aucun parfum */
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-600 mb-4">Aucun parfum trouvé</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-onyx text-white px-6 py-2 rounded-lg hover:bg-ruby transition"
          >
            Ajouter le premier parfum
          </button>
        </div>
      ) : (
        /* Tableau des parfums */
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Parfum</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Marque</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Catégorie</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Genre</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Prix</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {perfumes.map((perfume) => (
                <tr key={perfume.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={perfume.image}
                        alt={perfume.name}
                        className="w-10 h-10 rounded object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/40?text=?";
                        }}
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
                      {perfume.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{perfume.gender}</td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {perfume.price.toLocaleString("fr-FR")} XOF
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(perfume.id, perfume.name)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded transition"
                      title="Supprimer"
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
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0">
              <h3 className="text-2xl font-bold">Ajouter un Parfum</h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setSubmitError("");
                }}
                className="text-2xl text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {submitError && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                  ❌ {submitError}
                </div>
              )}

              {/* Nom et Marque */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Nom *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="ex: Oud Royal"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Marque *</label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    placeholder="ex: Al Farez"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                    required
                  />
                </div>
              </div>

              {/* Sous-titre */}
              <div>
                <label className="block text-sm font-semibold mb-1">Sous-titre</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="ex: Bois précieux"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                />
              </div>

              {/* Prix et Catégorie */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Prix (FCFA)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: parseInt(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Catégorie</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value as Category })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                  >
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                    <option value="diffuseur">Diffuseur</option>
                  </select>
                </div>
              </div>

              {/* Genre et Famille */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Genre</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                  >
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Famille</label>
                  <select
                    value={form.family}
                    onChange={(e) => setForm({ ...form, family: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
                  >
                    <option value="Oriental">Oriental</option>
                    <option value="Floral">Floral</option>
                    <option value="Fruité">Fruité</option>
                    <option value="Boisé">Boisé</option>
                    <option value="Épicé">Épicé</option>
                    <option value="Aquatique">Aquatique</option>
                    <option value="Chypré">Chypré</option>
                  </select>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-4 pt-4 border-t">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-onyx text-white py-2 rounded-lg hover:bg-ruby transition disabled:opacity-50 font-semibold"
                >
                  {submitting ? "Enregistrement..." : "Ajouter Parfum"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSubmitError("");
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
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