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

// --- NUEVAS INTERFACES PARA ÓRDENES ---

export interface CustomerDetails {
  nombre: string;
  apellidos: string;
  correo: string;
  calle: string;
  depto: string;
  region: string;
  comuna: string;
}

export interface Order {
  id: string; // El OrderId (ej: "ORD-123456789")
  date: string; // Fecha de la orden en formato ISO
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
  status: 'Procesando' | 'Enviado' | 'Completado' | 'Cancelado';
}