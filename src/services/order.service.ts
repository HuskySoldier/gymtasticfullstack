import type { Order, CustomerDetails, CartItem } from '../interfaces/app.interfaces';

// Simulación de BBDD de Órdenes en memoria
let mockOrders: Order[] = [
  {
    id: 'ORD-1736458001',
    date: '2025-11-04T18:30:00.000Z',
    customer: {
      nombre: 'Jane',
      apellidos: 'Doe',
      correo: 'jane.doe@example.com',
      calle: 'Av. Ejemplo 456',
      depto: 'Depto 101',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Maipú'
    },
    items: [
      { 
        product: {
          id: 5, name: "Polera Deportiva Dry-Fit", 
          description: "", image: "https://source.unsplash.com/400x400/?gym,tshirt",
          price: 15000, stock: 120, category: 'Ropa'
        }, 
        quantity: 2 
      },
    ],
    total: 30000,
    status: 'Completado'
  }
];

/**
 * Obtiene todas las órdenes (para el admin).
 */
export const getOrders = async (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Devuelve una copia ordenada por fecha, de más nueva a más vieja
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
 * Crea una nueva orden (llamado desde el Checkout).
 */
export const createOrder = async (
  customer: CustomerDetails, 
  items: CartItem[], 
  total: number
): Promise<Order> => {
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