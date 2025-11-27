import type { Order, CustomerDetails, CartItem } from '../interfaces/app.interfaces';

const CHECKOUT_API = 'http://localhost:8086'; // Base URL

// Helper para mapear la respuesta del backend (OrderDto) a la interfaz Order del frontend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapBackendOrderToFrontend = (backendOrder: any): Order => {
  return {
    id: backendOrder.id.toString(),
    date: backendOrder.date, // Formato ISO que viene de Java
    total: backendOrder.totalAmount,
    status: 'Completado', // El backend actual no maneja estados, asumimos completado
    
    // Reconstruimos datos del cliente con lo que tenemos (el email)
    customer: {
      nombre: 'Cliente', // No guardamos el nombre en la orden, solo el email
      apellidos: '',
      correo: backendOrder.userEmail,
      calle: 'Dirección guardada en perfil', // Dato no disponible en este endpoint
      depto: '',
      region: '',
      comuna: ''
    },

    // Reconstruimos un item genérico con la descripción
    items: [
      {
        product: {
          id: 0,
          name: backendOrder.description || 'Compra Gymtastic',
          description: '',
          image: 'https://source.unsplash.com/50x50/?gym', // Imagen genérica
          price: backendOrder.totalAmount,
          stock: 0,
          category: 'Equipamiento' // Valor por defecto
        },
        quantity: 1
      }
    ]
  };
};

export const createOrder = async (
  customer: CustomerDetails, 
  items: CartItem[], 
  total: number
): Promise<Order> => {
  
  // ... (El código de createOrder se mantiene IGUAL que en la respuesta anterior) ...
  // Solo asegúrate de que apunte a `${CHECKOUT_API}/checkout`
  
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

  return {
    id: `ORD-${Date.now()}`, 
    date: new Date().toISOString(),
    customer,
    items,
    total,
    status: 'Completado'
  };
};

// --- FUNCIÓN ACTUALIZADA PARA ADMIN ---
export const getOrders = async (): Promise<Order[]> => {
  try {
    // Llamamos al nuevo endpoint del backend
    const response = await fetch(`${CHECKOUT_API}/orders`);
    
    if (!response.ok) {
      console.error('Error fetching orders');
      return [];
    }

    const data = await response.json();
    // Mapeamos cada orden del backend al formato del frontend
    return data.map(mapBackendOrderToFrontend);

  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getOrderById = async (id: string): Promise<Order | null> => {
    console.log("Buscando orden por ID (simulado):", id);
    return null; 
};