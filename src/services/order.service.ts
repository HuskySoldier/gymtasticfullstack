import type { Order, CustomerDetails, CartItem } from '../interfaces/app.interfaces';
// --- 1. IMPORTA LA NUEVA FUNCIÓN ---
import { reduceStock } from './product.service'; 

// Simulación de BBDD de Órdenes en memoria
let mockOrders: Order[] = [
  // ... (tu orden de ejemplo)
];

/**
 * Obtiene todas las órdenes (para el admin).
 */
export const getOrders = async (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockOrders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, 300);
  });
};

/**
 * Obtiene una orden por su ID.
 */
export const getOrderById = async (id: string): Promise<Order | null> => {
  return new Promise((resolve) => {
    const order = mockOrders.find(o => o.id === id);
    setTimeout(() => {
      resolve(order || null);
    }, 300);
  });
};

/**
 * Crea una nueva orden y REDUCE EL STOCK.
 */
export const createOrder = async (
  customer: CustomerDetails, 
  items: CartItem[], 
  total: number
): Promise<Order> => {

  // --- 2. AÑADIMOS LA LÓGICA DE REDUCCIÓN DE STOCK ---
  try {
    // Creamos un array de promesas, una por cada item a actualizar
    const stockUpdates = items.map(item => 
      reduceStock(item.product.id, item.quantity)
    );
    // Esperamos a que TODAS las actualizaciones de stock terminen
    await Promise.all(stockUpdates);
    console.log('Stock actualizado exitosamente.');
  } catch (error) {
    console.error("Error al actualizar el stock:", error);
    // En una app real, aquí deberías frenar la creación de la orden y devolver un error
  }
  // --- FIN DE LA LÓGICA DE STOCK ---

  // El resto de la función sigue igual
  return new Promise((resolve) => {
    const newOrderId = `ORD-${Date.now()}`;
    const newOrder: Order = {
      id: newOrderId,
      date: new Date().toISOString(),
      customer,
      items: [...items], // Crea una copia de los items
      total,
      status: 'Procesando',
    };
    
    mockOrders.push(newOrder);
    
    setTimeout(() => {
      resolve(newOrder);
    }, 300);
  });
};