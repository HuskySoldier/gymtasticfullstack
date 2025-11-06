import { MOCK_PRODUCTS } from '../data/mock-db';
import type { Product, AllProductsResponse, SingleProductResponse } from '../interfaces/app.interfaces';

// --- 1. Definimos la llave y los helpers de localStorage ---
const PRODUCTS_STORAGE_KEY = 'gymtastic_products_db';

const getProductsFromStorage = (): Product[] => {
  try {
    const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
  } catch (error) {
    console.error("Error al leer productos de localStorage", error);
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
  }
  
  // Si no hay nada, cargamos el MOCK inicial
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(MOCK_PRODUCTS));
  return MOCK_PRODUCTS;
};

const saveProductsToStorage = (products: Product[]): void => {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error al guardar productos en localStorage", error);
  }
};

// --- 2. Nuestra "BBDD" en memoria ahora lee de localStorage ---
let productsDB: Product[] = getProductsFromStorage();

/**
 * Obtiene todos los productos.
 */
export const getProducts = async (): Promise<AllProductsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        statusCode: 200,
        products: productsDB,
      });
    }, 300); // Reducido el delay
  });
};

/**
 * Obtiene un producto por su ID.
 */
export const getProductById = async (id: number): Promise<SingleProductResponse> => {
  return new Promise((resolve) => {
    const product = productsDB.find(p => p.id === id);
    setTimeout(() => {
      if (product) {
        resolve({ ok: true, statusCode: 200, product: product });
      } else {
        resolve({ ok: false, statusCode: 404, product: undefined });
      }
    }, 300);
  });
};

/**
 * Crea un nuevo producto y lo guarda en localStorage.
 */
export const createProduct = async (newProductData: Omit<Product, 'id'>): Promise<SingleProductResponse> => {
  const newId = Math.max(0, ...productsDB.map(p => p.id)) + 1; // Asegura que funcione si la BBDD está vacía
  const newProduct: Product = { ...newProductData, id: newId };
  
  productsDB.push(newProduct);
  saveProductsToStorage(productsDB); // <--- GUARDA
  
  return {
    ok: true,
    statusCode: 201,
    product: newProduct,
  };
};

/**
 * Actualiza un producto y lo guarda en localStorage.
 */
export const updateProduct = async (id: number, updates: Partial<Product>): Promise<SingleProductResponse> => {
  const productIndex = productsDB.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return { ok: false, statusCode: 404, product: undefined };
  }

  const updatedProduct = { ...productsDB[productIndex], ...updates };
  productsDB[productIndex] = updatedProduct;
  
  saveProductsToStorage(productsDB); // <--- GUARDA
  
  return {
    ok: true,
    statusCode: 200,
    product: updatedProduct,
  };
};

/**
 * Elimina un producto y guarda en localStorage.
 */
export const deleteProduct = async (id: number): Promise<{ ok: boolean; statusCode: number }> => {
  const productIndex = productsDB.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return { ok: false, statusCode: 404 };
  }

  productsDB.splice(productIndex, 1);
  saveProductsToStorage(productsDB); // <--- GUARDA
  
  return { ok: true, statusCode: 204 };
};

export const getProductsByCategory = async (categoryName: string): Promise<AllProductsResponse> => {
  // ... (Esta función no cambia)
  return new Promise((resolve) => {
    const lowerCaseCategory = categoryName.toLowerCase();
    const filteredProducts = productsDB.filter(
      (product) => product.category.toLowerCase() === lowerCaseCategory
    );
    setTimeout(() => {
      resolve({ ok: true, statusCode: 200, products: filteredProducts });
    }, 300);
  });
};


// --- 3. NUEVA FUNCIÓN PARA REDUCIR STOCK ---
/**
 * Reduce el stock de un producto específico.
 * Esta función es llamada por el servicio de Órdenes.
 */
export const reduceStock = async (productId: number, quantityToReduce: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const productIndex = productsDB.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      resolve(false); // Producto no encontrado
      return;
    }

    const product = productsDB[productIndex];

    // No reducir stock de membresías (Infinity)
    if (product.stock === Infinity) {
      resolve(true); // Éxito (no se hace nada)
      return;
    }

    const newStock = product.stock - quantityToReduce;
    
    // Actualiza el producto
    productsDB[productIndex] = {
      ...product,
      stock: newStock < 0 ? 0 : newStock, // Asegura que el stock no sea negativo
    };

    saveProductsToStorage(productsDB); // <--- GUARDA EL NUEVO STOCK
    resolve(true);
  });
};