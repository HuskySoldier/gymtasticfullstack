import { MOCK_PRODUCTS } from '../data/mock-db';
import type { export Product, AllProductsResponse, SingleProductResponse } from '../interfaces/app.interfaces';

// Simulación de una base de datos en memoria
let productsDB: Product[] = [...MOCK_PRODUCTS];

/**
 * Obtiene todos los productos.
 * Simula una respuesta de API asíncrona.
 */
export const getProducts = async (): Promise<AllProductsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        statusCode: 200,
        products: productsDB,
      });
    }, 500); // Simula un pequeño retraso de red
  });
};

/**
 * Obtiene un producto por su ID.
 * Simula una respuesta de API asíncrona.
 */
export const getProductById = async (id: number): Promise<SingleProductResponse> => {
  return new Promise((resolve) => {
    const product = productsDB.find(p => p.id === id);
    setTimeout(() => {
      if (product) {
        resolve({
          ok: true,
          statusCode: 200,
          product: product,
        });
      } else {
        resolve({
          ok: false,
          statusCode: 404,
          product: undefined,
        });
      }
    }, 500);
  });
};

// --- Funciones CRUD (Create, Update, Delete) ---
// Estas funciones cumplen con el requisito del PDF [cite: 32]

/**
 * Crea un nuevo producto.
 * (Simulado: solo lo añade al array en memoria)
 */
export const createProduct = async (newProductData: Omit<Product, 'id'>): Promise<SingleProductResponse> => {
  const newId = Math.max(...productsDB.map(p => p.id)) + 1;
  const newProduct: Product = { ...newProductData, id: newId };
  productsDB.push(newProduct);
  
  return {
    ok: true,
    statusCode: 201, // 201 Created
    product: newProduct,
  };
};

/**
 * Actualiza un producto existente por ID.
 */
export const updateProduct = async (id: number, updates: Partial<Product>): Promise<SingleProductResponse> => {
  const productIndex = productsDB.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return { ok: false, statusCode: 404, product: undefined };
  }

  const updatedProduct = { ...productsDB[productIndex], ...updates };
  productsDB[productIndex] = updatedProduct;

  return {
    ok: true,
    statusCode: 200,
    product: updatedProduct,
  };
};

/**
 * Elimina un producto por ID.
 */
export const deleteProduct = async (id: number): Promise<{ ok: boolean; statusCode: number }> => {
  const productIndex = productsDB.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return { ok: false, statusCode: 404 };
  }

  productsDB.splice(productIndex, 1);
  return { ok: true, statusCode: 204 }; // 204 No Content
};

export const getProductsByCategory = async (categoryName: string): Promise<AllProductsResponse> => {
  return new Promise((resolve) => {
    const lowerCaseCategory = categoryName.toLowerCase();
    const filteredProducts = productsDB.filter(
      (product) => product.category.toLowerCase() === lowerCaseCategory
    );
    
    setTimeout(() => {
      resolve({
        ok: true,
        statusCode: 200,
        products: filteredProducts,
      });
    }, 300);
  });
};