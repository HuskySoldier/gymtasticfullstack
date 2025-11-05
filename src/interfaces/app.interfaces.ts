// Este archivo define las interfaces para la tienda del Gimnasio.
// Los "Productos" pueden ser membresías, suplementos, ropa, etc.

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string; // Imagen principal
  
  // --- CAMPOS DE LA TIENDA ---
  price: number;
  stock: number; // Puede ser 'Infinity' para membresías o clases
  category: 'Membresías' | 'Suplementos' | 'Ropa' | 'Equipamiento'; // Categorías de ejemplo
}

// Interface para el item en el carrito
export interface CartItem {
  product: Product;
  quantity: number;
}

// Interfaces para las funciones del servicio (Mock DB)
export interface AllProductsResponse {
  ok: boolean;
  statusCode: number;
  products: Product[];
}

export interface SingleProductResponse {
  ok: boolean;
  statusCode: number;
  product?: Product;
}