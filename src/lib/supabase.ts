// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// Types
// ============================================

export type Gender = 'Homme' | 'Femme' | 'Unisex';
export type PerfumeType = 'Authentique' | 'Standard';
export type Volume = 50 | 100;
export type Quantity = 25 | 50 | 100 | 250 | 500;
export type Category = 'homme' | 'femme' | 'diffuseur';

export type PerfumeFamily = 
  | 'Oriental' 
  | 'Floral' 
  | 'Fruité' 
  | 'Boisé' 
  | 'Épicé' 
  | 'Aquatique' 
  | 'Chypré';

export type Perfume = {
  id: string;
  name: string;
  brand: string;
  subtitle: string;
  description?: string;
  price: number; // en FCFA
  image: string;
  accent: string;
  gender: Gender;
  category: Category;
  type: PerfumeType;
  family: PerfumeFamily;
  volumes: Volume[];
  minQuantity: Quantity;
  badge?: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PerfumeInput = Omit<Perfume, 'id' | 'slug' | 'createdAt' | 'updatedAt'>;

export const ALL_QUANTITIES: Quantity[] = [25, 50, 100, 250, 500];

// ============================================
// Database Functions
// ============================================

/**
 * Récupère tous les parfums actifs
 */
export async function getAllPerfumes(): Promise<Perfume[]> {
  const { data, error } = await supabase
    .from('parfums')
    .select('*')
    .eq('is_active', true)
    .order('brand');

  if (error) {
    console.error('Error fetching perfumes:', error);
    throw new Error('Impossible de charger les parfums');
  }

  return (data || []).map(mapDbToPerfume);
}

/**
 * Récupère les parfums par catégorie
 */
export async function getPerfumesByCategory(category: Category): Promise<Perfume[]> {
  const { data, error } = await supabase
    .from('parfums')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('brand');

  if (error) {
    console.error('Error fetching perfumes by category:', error);
    throw new Error(`Impossible de charger les parfums de la catégorie ${category}`);
  }

  return (data || []).map(mapDbToPerfume);
}

/**
 * Récupère les parfums par genre (peut contenir unisex)
 */
export async function getPerfumesByGender(gender: Gender, category: Category): Promise<Perfume[]> {
  // Logique : afficher les parfums du genre demandé dans cette catégorie,
  // PLUS tous les unisex (peu importe leur catégorie de stockage)
  const { data, error } = await supabase
    .from('parfums')
    .select('*')
    .or(`and(category.eq.${category},gender.eq.${gender}),gender.eq.Unisex`)
    .eq('is_active', true)
    .order('brand');

  if (error) {
    console.error('Error fetching perfumes by gender:', error);
    throw new Error(`Impossible de charger les parfums ${gender}`);
  }

  return (data || []).map(mapDbToPerfume);
}

/**
 * Récupère un parfum par ID
 */
export async function getPerfumeById(id: string): Promise<Perfume | null> {
  const { data, error } = await supabase
    .from('parfums')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching perfume:', error);
    throw error;
  }

  return data ? mapDbToPerfume(data) : null;
}

/**
 * Récupère les marques uniques d'une catégorie
 */
export async function getBrandsByCategory(category: Category): Promise<string[]> {
  const perfumes = await getPerfumesByCategory(category);
  return [...new Set(perfumes.map(p => p.brand))].sort();
}

/**
 * Récupère les familles uniques d'une catégorie
 */
export async function getFamiliesByCategory(category: Category): Promise<PerfumeFamily[]> {
  const { data, error } = await supabase
    .from('parfums')
    .select('family')
    .eq('category', category)
    .eq('is_active', true);

  if (error) throw error;

  return [...new Set((data || []).map(p => p.family))].sort() as PerfumeFamily[];
}

// ============================================
// Admin Functions
// ============================================

/**
 * Crée un nouveau parfum
 */
export async function createPerfume(input: PerfumeInput): Promise<Perfume> {
  const slug = generateSlug(input.name);
  
  const { data, error } = await supabase
    .from('parfums')
    .insert([
      {
        name: input.name,
        brand: input.brand,
        subtitle: input.subtitle,
        description: input.description,
        price: input.price,
        category: input.category,
        gender: input.gender,
        type: input.type,
        family: input.family,
        image: input.image,
        accent: input.accent,
        badge: input.badge,
        volumes: input.volumes,
        min_quantity: input.minQuantity,
        slug: slug,
        is_active: input.isActive,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating perfume:', error);
    throw new Error('Impossible de créer le parfum');
  }

  return mapDbToPerfume(data);
}

/**
 * Met à jour un parfum
 */
export async function updatePerfume(id: string, input: Partial<PerfumeInput>): Promise<Perfume> {
  const updateData: any = { ...input };
  
  if (input.name) {
    updateData.slug = generateSlug(input.name);
  }
  
  if (input.price !== undefined) {
    updateData.price = input.price;
  }
  
  // Converter snake_case pour la BD
  updateData.min_quantity = input.minQuantity;
  delete updateData.minQuantity;
  
  updateData.is_active = input.isActive;
  delete updateData.isActive;

  const { data, error } = await supabase
    .from('parfums')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating perfume:', error);
    throw new Error('Impossible de mettre à jour le parfum');
  }

  return mapDbToPerfume(data);
}

/**
 * Supprime un parfum (soft delete)
 */
export async function deletePerfume(id: string): Promise<void> {
  const { error } = await supabase
    .from('parfums')
    .update({ is_active: false })
    .eq('id', id);

  if (error) {
    console.error('Error deleting perfume:', error);
    throw new Error('Impossible de supprimer le parfum');
  }
}

/**
 * Upload une image vers Supabase Storage
 */
export async function uploadPerfumeImage(
  file: File,
  category: Category,
  perfumeName: string
): Promise<string> {
  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name}`;
  const path = `${category}/${filename}`;

  const { error: uploadError } = await supabase.storage
    .from('parfums')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw new Error('Impossible de télécharger l\'image');
  }

  // Récupère l'URL publique
  const { data: publicUrlData } = supabase.storage
    .from('parfums')
    .getPublicUrl(path);

  return publicUrlData.publicUrl;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Mappe les données de la BD vers le type Perfume
 */
function mapDbToPerfume(data: any): Perfume {
  return {
    id: data.id,
    name: data.name,
    brand: data.brand,
    subtitle: data.subtitle,
    description: data.description,
    price: data.price,
    image: data.image,
    accent: data.accent,
    gender: data.gender,
    category: data.category,
    type: data.type,
    family: data.family,
    volumes: data.volumes || [50, 100],
    minQuantity: data.min_quantity || 25,
    badge: data.badge,
    slug: data.slug,
    isActive: data.is_active,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

/**
 * Génère un slug à partir du nom
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Formate un montant en FCFA
 */
export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Convertit un prix FCFA en centimes pour la BD
 */
export function toDbPrice(amount: number): number {
  return Math.round(amount);
}

/**
 * Convertit un prix de centimes en FCFA
 */
export function fromDbPrice(amount: number): number {
  return amount;
}
// Ajoute cette fonction à la fin de src/lib/supabase.ts

/**
 * Récupère les marques uniques d'une liste de parfums
 */
export function getBrands(perfumes: Perfume[]): string[] {
  return [...new Set(perfumes.map(p => p.brand))].sort();
}