import type { Product, AllProductsResponse, SingleProductResponse } from '../interfaces/app.interfaces';

const API_URL = 'http://localhost:8081/products';

// --- HELPER: Obtener cabeceras con Token ---
const getAuthHeaders = () => {
  const token = localStorage.getItem('gym_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// --- DEFINICIÓN DE TIPOS DE BACKEND ---
interface BackendProduct {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock?: number | null;
  img?: string;
  tipo?: string;
}

// --- HELPER: Mapear de Backend a Frontend ---
const mapToFrontend = (data: BackendProduct): Product => {
  type CategoryType = 'Membresías' | 'Suplementos' | 'Ropa' | 'Equipamiento';
  
  let mappedCategory: CategoryType = 'Suplementos'; 
  let cleanDescription = data.descripcion || '';

  // ESTRATEGIA: Detectar categoría basada en etiquetas [Categoria]
  const categories = ['Membresías', 'Suplementos', 'Ropa', 'Equipamiento'] as const;
  
  let foundTag = false;
  for (const cat of categories) {
    const tag = `[${cat}]`;
    if (cleanDescription.startsWith(tag)) {
      mappedCategory = cat;
      cleanDescription = cleanDescription.replace(tag, '').trim(); 
      foundTag = true;
      break;
    }
  }

  // ESTRATEGIA DE RESPALDO (Legacy)
  if (!foundTag) {
    if (data.tipo?.toLowerCase() === 'plan') {
      mappedCategory = 'Membresías';
    } else if (cleanDescription.toLowerCase().includes('ropa') || cleanDescription.toLowerCase().includes('polera')) {
      mappedCategory = 'Ropa';
    } else if (cleanDescription.toLowerCase().includes('mancuerna') || cleanDescription.toLowerCase().includes('peso')) {
      mappedCategory = 'Equipamiento';
    }
  }

  
  return {
    id: data.id,
    name: data.nombre,
    description: cleanDescription,
    // CAMBIO AQUÍ: Ahora aceptamos rutas que empiecen con 'http' O con '/'
    image: (data.img && (data.img.startsWith('http') || data.img.startsWith('/'))) 
            ? data.img 
            : 'https://source.unsplash.com/random?gym', // Fallback si no hay imagen válida
    price: data.precio,
    stock: (data.stock === null || data.stock === undefined) ? Infinity : data.stock,
    category: mappedCategory
  }
};

// --- MÉTODOS PÚBLICOS (Lectura) ---

export const getProducts = async (): Promise<AllProductsResponse> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error fetching products');
    const data: BackendProduct[] = await response.json();
    const products = data.map(mapToFrontend);
    return { ok: true, statusCode: 200, products };
  } catch (error) {
    console.error(error);
    return { ok: false, statusCode: 500, products: [] };
  }
};

export const getProductById = async (id: number): Promise<SingleProductResponse> => {
  try {
    // Si el backend no tiene endpoint individual, traemos todos y filtramos
    const response = await fetch(API_URL); 
    const data: BackendProduct[] = await response.json();
    const productBackend = data.find((p) => p.id === id);

    if (productBackend) {
      return { ok: true, statusCode: 200, product: mapToFrontend(productBackend) };
    }
    return { ok: false, statusCode: 404 };
  } catch (error) {
    console.error("Error getting product:", error);
    return { ok: false, statusCode: 500 };
  }
};

export const getProductsByCategory = async (categoryName: string): Promise<AllProductsResponse> => {
  try {
    const response = await getProducts(); 
    const filtered = response.products.filter(p => {
        return p.category.toLowerCase() === categoryName.toLowerCase();
    });
    return { ok: true, statusCode: 200, products: filtered };
  } catch (error) {
    console.error("Error getting products by category:", error);
    return { ok: false, statusCode: 500, products: [] };
  }
};

// --- MÉTODOS PROTEGIDOS (Requieren Token) ---

export const createProduct = async (product: Omit<Product, 'id'>): Promise<SingleProductResponse> => {
  try {
    const taggedDescription = `[${product.category}] ${product.description}`;

    const backendProduct: Partial<BackendProduct> = {
      nombre: product.name,
      descripcion: taggedDescription, 
      precio: product.price,
      stock: product.stock === Infinity ? 9999 : product.stock,
      img: product.image,
      tipo: product.category === 'Membresías' ? 'plan' : 'merch'
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(), // <--- Token incluido
      body: JSON.stringify(backendProduct)
    });

    if (response.ok) {
      const newProduct: BackendProduct = await response.json();
      return { ok: true, statusCode: 201, product: mapToFrontend(newProduct) };
    }
    return { ok: false, statusCode: response.status };
  } catch (error) {
    console.error("Error creating product:", error);
    return { ok: false, statusCode: 500 };
  }
};

export const updateProduct = async (id: number, updates: Partial<Product>): Promise<SingleProductResponse> => {
  try {
    const backendUpdates: Partial<BackendProduct> = {};
    
    if(updates.name) backendUpdates.nombre = updates.name;
    
    if(updates.description || updates.category) {
       const prefix = updates.category ? `[${updates.category}] ` : '';
       backendUpdates.descripcion = prefix + (updates.description || '');
    }

    if(updates.price) backendUpdates.precio = updates.price;
    if(updates.stock) backendUpdates.stock = updates.stock === Infinity ? 9999 : updates.stock;
    if(updates.image) backendUpdates.img = updates.image;
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(), // <--- Token incluido
      body: JSON.stringify(backendUpdates)
    });

    if (response.ok) {
      const updated: BackendProduct = await response.json();
      return { ok: true, statusCode: 200, product: mapToFrontend(updated) };
    }
    return { ok: false, statusCode: response.status };
  } catch (error) {
    console.error("Error updating product:", error);
    return { ok: false, statusCode: 500 };
  }
};

export const deleteProduct = async (id: number): Promise<{ ok: boolean; statusCode: number }> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { 
      method: 'DELETE',
      headers: getAuthHeaders() // <--- Token incluido (aunque no tenga body)
    });
    return { ok: response.ok, statusCode: response.status };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { ok: false, statusCode: 500 };
  }
};

export const reduceStock = async (productId: number, quantity: number): Promise<boolean> => {
  try {
    const payload = {
        items: [{ productId, qty: quantity }]
    };
    const response = await fetch(`${API_URL}/decrement-stock`, {
        method: 'POST',
        headers: getAuthHeaders(), // <--- Token incluido
        body: JSON.stringify(payload)
    });
    return response.ok;
  } catch (e) {
    console.error("Error reducing stock:", e);
    return false;
  }
};