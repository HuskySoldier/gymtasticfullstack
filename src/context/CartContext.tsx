import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../interfaces/app.interfaces';

// Definimos la forma de un item en el carrito
interface CartItem {
  product: Product;
  quantity: number;
}

// Definimos lo que nuestro Contexto va a proveer
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

// Creamos el Contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Definimos las props del Provider
interface CartProviderProps {
  children: ReactNode;
}

// Creamos el Componente "Provider"
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Añadir al carrito (o incrementar cantidad si ya existe)
  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        // Si existe, actualizamos la cantidad
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no existe, lo añadimos
        return [...prevCart, { product, quantity }];
      }
    });
  };

  // Eliminar un item del carrito
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  // Actualizar la cantidad de un item
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      // Si la cantidad es 0 o menos, eliminar el item
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Calcular el precio total
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  // El valor que proveeremos a los componentes hijos
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook personalizado para consumir el contexto fácilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};