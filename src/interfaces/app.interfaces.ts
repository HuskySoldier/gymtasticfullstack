// src/interfaces/app.interfaces.ts

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stock?: number;     // Puede ser opcional o number
  category: string;
}

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
  id: string;
  date: string;
  total: number;
  status: string;
  customer: CustomerDetails;
  items: CartItem[]; // Ahora Order también puede usar CartItem
}

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

// --- AGREGA ESTO AL FINAL ---
export interface CartItem {
  product: Product;
  quantity: number;
}