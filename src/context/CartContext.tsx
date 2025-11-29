import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Product, CartItem } from '../interfaces/app.interfaces';

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number; // ¡Lo mantenemos como función para compatibilidad!
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // 1. Inicializar desde LocalStorage para no perder datos al recargar
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('gym_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage", error);
      return [];
    }
  });

  // 2. Guardar en LocalStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem('gym_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      
      // --- VALIDACIÓN DE STOCK ---
      const currentQty = existing ? existing.quantity : 0;
      const availableStock = product.stock ?? 0; 

      if (availableStock !== Infinity && (currentQty + quantity > availableStock)) {
        alert(`¡Stock insuficiente! Solo quedan ${availableStock} unidades.`);
        return prev;
      }
      // ---------------------------

      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        // --- VALIDACIÓN AL ACTUALIZAR ---
        const availableStock = item.product.stock ?? 0;
        if (availableStock !== Infinity && quantity > availableStock) {
           alert(`No puedes superar el stock máximo (${availableStock}).`);
           return { ...item, quantity: availableStock };
        }
        // --------------------------------
        return { ...item, quantity: Math.max(0, quantity) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  // 3. Función para calcular total (Crucial para que CartPage no falle)
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getTotalPrice, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};