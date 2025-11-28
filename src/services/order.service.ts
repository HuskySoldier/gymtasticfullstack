// src/services/order.service.ts
import type { Order, CustomerDetails, CartItem } from '../interfaces/app.interfaces';

const CHECKOUT_API = 'http://localhost:8086'; 

// Helper para mapear DTO de backend a Frontend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapBackendOrderToFrontend = (backendOrder: any): Order => {
  return {
    id: backendOrder.id.toString(),
    date: backendOrder.date,
    total: backendOrder.totalAmount,
    status: 'Completado', 
    customer: {
      nombre: 'Cliente',
      apellidos: '',
      correo: backendOrder.userEmail,
      calle: 'Dirección registrada',
      depto: '',
      region: '',
      comuna: ''
    },
    // Reconstrucción genérica de items para visualización en lista
    items: Array(backendOrder.itemsCount || 1).fill({
        product: {
            id: 0,
            name: backendOrder.description || 'Items Varios',
            description: '',
            image: 'https://source.unsplash.com/50x50/?gym',
            price: 0, 
            stock: 0,
            category: 'Equipamiento'
        },
        quantity: 1
    })
  };
};

export const createOrder = async (
  customer: CustomerDetails, 
  items: CartItem[], 
  total: number
): Promise<Order> => {
  
  const itemsPayload = items.map(item => ({
    productId: item.product.id,
    qty: item.quantity, 
    tipo: item.product.category === 'Membresías' ? 'plan' : 'merch',
    nombre: item.product.name,
    precio: item.product.price
  }));

  const defaultSede = {
      id: 1,
      nombre: "Sede Central",
      direccion: "Av Siempre Viva",
      lat: -33.4,
      lng: -70.6
  };

  const payload = {
    userEmail: customer.correo,
    items: itemsPayload,
    sede: defaultSede 
  };

  const response = await fetch(`${CHECKOUT_API}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al procesar el pago');
  }

  // Devolvemos una orden confirmada con ID temporal generado por backend o timestamp
  return {
    id: `ORD-${Date.now()}`, 
    date: new Date().toISOString(),
    customer,
    items,
    total,
    status: 'Completado'
  };
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch(`${CHECKOUT_API}/orders`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.map(mapBackendOrderToFrontend);
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Implementación real (busca en todos y filtra)
export const getOrderById = async (id: string): Promise<Order | null> => {
    try {
        const allOrders = await getOrders();
        return allOrders.find(o => o.id === id) || null;
    } catch (e) {
        console.error(e);
        return null;
    }
};