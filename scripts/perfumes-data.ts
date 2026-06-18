// scripts/perfumes-data.ts
// Exemple avec les marques visibles: Armani, Chanel, Dior, etc.

export const perfumesData = [
  // ============ HOMME (31) ============
  
  // Armani
  {
    name: 'Acqua di Gio',
    brand: 'Armani',
    subtitle: 'Aquatique frais',
    price: 19500,
    category: 'homme',
    gender: 'Homme',
    type: 'Standard',
    family: 'Aquatique',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/homme/acqua-di-gio.jpg',
    accent: '#0066cc',
    volumes: [50, 100],
    minQuantity: 25,
    badge: 'BEST-SELLER',
  },
  {
    name: 'Armani Code',
    brand: 'Armani',
    subtitle: 'Floral épicé',
    price: 21000,
    category: 'homme',
    gender: 'Homme',
    type: 'Authentique',
    family: 'Épicé',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/homme/armani-code.jpg',
    accent: '#1a1a1a',
    volumes: [50, 100],
    minQuantity: 25,
    badge: null,
  },

  // Chanel
  {
    name: 'Bleu Intense',
    brand: 'Chanel',
    subtitle: 'Sillage marin',
    price: 21000,
    category: 'homme',
    gender: 'Homme',
    type: 'Authentique',
    family: 'Aquatique',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/homme/bleu-chanel.jpg',
    accent: '#003366',
    volumes: [50, 100],
    minQuantity: 25,
    badge: 'ICONIQUE',
  },

  // Dior
  {
    name: 'Sauvage Elixir',
    brand: 'Dior',
    subtitle: 'Épicé sucré',
    price: 24000,
    category: 'homme',
    gender: 'Homme',
    type: 'Authentique',
    family: 'Épicé',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/homme/sauvage-dior.jpg',
    accent: '#8B4513',
    volumes: [50, 100],
    minQuantity: 25,
    badge: 'NOUVEAU',
  },
  {
    name: 'Phantom',
    brand: 'Dior',
    subtitle: 'Oriental boisé',
    price: 25500,
    category: 'homme',
    gender: 'Homme',
    type: 'Authentique',
    family: 'Boisé',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/homme/phantom-dior.jpg',
    accent: '#2C2C2C',
    volumes: [50, 100],
    minQuantity: 25,
    badge: null,
  },

  // Jean Paul Gaultier
  {
    name: 'Ultra Male',
    brand: 'Jean Paul Gaultier',
    subtitle: 'Floral fruité',
    price: 19500,
    category: 'homme',
    gender: 'Homme',
    type: 'Authentique',
    family: 'Fruité',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/homme/ultra-male.jpg',
    accent: '#FF6B35',
    volumes: [50, 100],
    minQuantity: 25,
    badge: null,
  },

  // Paco Rabanne
  {
    name: 'Phantom Legion',
    brand: 'Paco Rabanne',
    subtitle: 'Boisé frais',
    price: 20000,
    category: 'homme',
    gender: 'Homme',
    type: 'Authentique',
    family: 'Boisé',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/homme/phantom-legion.jpg',
    accent: '#1C1C1C',
    volumes: [50, 100],
    minQuantity: 25,
    badge: 'COUP DE CŒUR',
  },

  // Boss (Hugo Boss)
  {
    name: 'Boss Hugoboss',
    brand: 'Hugo Boss',
    subtitle: 'Floral épicé',
    price: 18000,
    category: 'homme',
    gender: 'Homme',
    type: 'Authentique',
    family: 'Épicé',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/homme/boss.jpg',
    accent: '#CC0000',
    volumes: [50, 100],
    minQuantity: 25,
    badge: null,
  },

  // Invictus
  {
    name: 'Invictus Victory',
    brand: 'Paco Rabanne',
    subtitle: 'Oriental frais',
    price: 21500,
    category: 'homme',
    gender: 'Homme',
    type: 'Authentique',
    family: 'Oriental',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/homme/invictus.jpg',
    accent: '#1A1A1A',
    volumes: [50, 100],
    minQuantity: 25,
    badge: null,
  },

  // Fahrenheit (Dior)
  {
    name: 'Fahrenheit',
    brand: 'Dior',
    subtitle: 'Boisé sucré',
    price: 22000,
    category: 'homme',
    gender: 'Homme',
    type: 'Authentique',
    family: 'Boisé',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/homme/fahrenheit.jpg',
    accent: '#B8860B',
    volumes: [50, 100],
    minQuantity: 25,
    badge: null,
  },

  // Scandal Black
  {
    name: 'Scandal Black',
    brand: 'Jean Paul Gaultier',
    subtitle: 'Fruité floral',
    price: 23000,
    category: 'homme',
    gender: 'Homme',
    type: 'Authentique',
    family: 'Fruité',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/homme/scandal-black.jpg',
    accent: '#1A1A1A',
    volumes: [50, 100],
    minQuantity: 25,
    badge: 'NOUVEAU',
  },

  // ... (Ajoute 21 autres parfums homme)

  // ============ FEMME (38) ============
  
  {
    name: 'Opium Pour Femme',
    brand: 'Yves Saint Laurent',
    subtitle: 'Oriental sucré',
    price: 23500,
    category: 'femme',
    gender: 'Femme',
    type: 'Authentique',
    family: 'Oriental',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/femme/opium.jpg',
    accent: '#8B0000',
    volumes: [50, 100],
    minQuantity: 25,
    badge: 'ICONIQUE',
  },

  {
    name: 'Chanel No. 5',
    brand: 'Chanel',
    subtitle: 'Floral classique',
    price: 26000,
    category: 'femme',
    gender: 'Femme',
    type: 'Authentique',
    family: 'Floral',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/femme/chanel-5.jpg',
    accent: '#FFD700',
    volumes: [50, 100],
    minQuantity: 25,
    badge: 'BEST-SELLER',
  },

  // ... (Ajoute 36 autres parfums femme)

  // ============ UNISEX (17) ============
  // Unisex doit apparaître dans homme ET femme
  
  {
    name: 'Black Essence',
    brand: 'Chanel',
    subtitle: 'Oriental boisé',
    price: 24000,
    category: 'homme', // Apparaît dans homme aussi
    gender: 'Unisex',
    type: 'Authentique',
    family: 'Boisé',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/homme/black-essence.jpg',
    accent: '#000000',
    volumes: [50, 100],
    minQuantity: 25,
    badge: null,
  },

  {
    name: 'Black Essence',
    brand: 'Chanel',
    subtitle: 'Oriental boisé',
    price: 24000,
    category: 'femme', // Apparaît aussi dans femme
    gender: 'Unisex',
    type: 'Authentique',
    family: 'Boisé',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/femme/black-essence.jpg',
    accent: '#000000',
    volumes: [50, 100],
    minQuantity: 25,
    badge: null,
  },

  // ... (Ajoute 15 autres paires unisex)

  // ============ DIFFUSEURS (20) ============
  
  {
    name: 'Diffuseur Vanille Gourmande',
    brand: 'Rituals',
    subtitle: 'Gourmand sucré',
    price: 8500,
    category: 'diffuseur',
    gender: 'Unisex',
    type: 'Standard',
    family: 'Fruité',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/diffuseur/vanille.jpg',
    accent: '#D4A574',
    volumes: [100],
    minQuantity: 10,
    badge: null,
  },

  {
    name: 'Diffuseur Rose Délicate',
    brand: 'Jo Malone',
    subtitle: 'Floral délicat',
    price: 10000,
    category: 'diffuseur',
    gender: 'Unisex',
    type: 'Authentique',
    family: 'Floral',
    image: 'https://hbvvopwwemxoxkpkcwcx.supabase.co/storage/v1/object/public/parfums/diffuseur/rose.jpg',
    accent: '#FFB6C1',
    volumes: [100],
    minQuantity: 10,
    badge: null,
  },

  // ... (Ajoute 18 autres diffuseurs)
];

/**
 * TOTAL: 106 parfums
 * - Homme: 31 (dont certains unisex)
 * - Femme: 38 (dont certains unisex)
 * - Unisex: 17 (apparaît dans homme ET femme = 34 enregistrements)
 * - Diffuseurs: 20
 *
 * Note: Les unisex sont créés 2 fois (une fois pour homme, une fois pour femme)
 * mais avec category différent, donc ils apparaissent dans les deux sections.
 */