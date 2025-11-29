// src/services/order.service.ts
import type { Order, CustomerDetails, CartItem } from '../interfaces/app.interfaces';

const CHECKOUT_API = 'http://localhost:8086';

// ===========================================
// 1️⃣ Helper Headers con Token
// ===========================================
const getAuthHeaders = () => {
  const token = localStorage.getItem('gym_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// ===========================================
// 2️⃣ Mapper Backend → Frontend
// ===========================================
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

// ===========================================
// 3️⃣ Crear Orden con Token en Headers
// ===========================================
export const createOrder = async (
  customer: CustomerDetails,
  items: CartItem[],
  total: number // <--- Faltaba este parámetro para devolverlo luego
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
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });

  // SI LA RESPUESTA NO ES OK (Ej. 409 Conflict por stock)
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    // Lanzamos el error con el mensaje que viene del backend
    throw new Error(errorData.message || 'Error al procesar el pago o stock insuficiente');
  }

  // --- AQUÍ ESTABA EL ERROR: FALTABA RETORNAR LA ORDEN CREADA ---
  return {
    id: `ORD-${Date.now()}`, 
    date: new Date().toISOString(),
    customer,
    items,
    total,
    status: 'Completado'
  };
};

// ===========================================
// 4️⃣ Obtener todas las órdenes (Autenticado)
// ===========================================
export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch(`${CHECKOUT_API}/orders`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) return [];
    const data = await response.json();
    return data.map(mapBackendOrderToFrontend);
  } catch (error) {
    console.error(error);
    return [];
  }
};

// ===========================================
// 5️⃣ Obtener una Orden por ID
// ===========================================
export const getOrderById = async (id: string): Promise<Order | null> => {
  try {
    const allOrders = await getOrders();
    return allOrders.find(o => o.id === id) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
};