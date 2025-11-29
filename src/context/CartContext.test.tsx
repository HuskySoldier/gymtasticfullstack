import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
// 1. IMPORTAMOS beforeEach
import { describe, it, expect, beforeEach } from 'vitest';
import type { Product } from '../interfaces/app.interfaces';

// Mock de un producto
const mockProduct: Product = {
  id: 1,
  name: 'Proteína Test',
  price: 1000,
  description: 'Desc',
  image: 'img.jpg',
  stock: 10,
  category: 'Suplementos'
};

describe('CartContext', () => {
  // 2. COLOCAMOS beforeEach AQUÍ (Nivel del describe, no dentro del it)
  // Esto asegura que el localStorage esté limpio antes de CADA prueba individual
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe iniciar con el carrito vacío', () => {
    // Renderizamos el hook dentro del Provider
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    expect(result.current.cart).toEqual([]);
    expect(result.current.getTotalPrice()).toBe(0);
  });

  it('debe añadir un producto al carrito', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    // Usamos 'act' porque esto actualiza el estado de React
    act(() => {
      result.current.addToCart(mockProduct, 1);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].product.name).toBe('Proteína Test');
    expect(result.current.getTotalPrice()).toBe(1000);
  });

  it('debe incrementar la cantidad si se añade el mismo producto', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart(mockProduct, 1);
      result.current.addToCart(mockProduct, 2); // Añadimos 2 más
    });

    expect(result.current.cart).toHaveLength(1); // Sigue siendo 1 item
    expect(result.current.cart[0].quantity).toBe(3); // Cantidad total 3 (1 inicial + 2 nuevos)
    expect(result.current.getTotalPrice()).toBe(3000);
  });

  it('debe eliminar un producto', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart(mockProduct, 1);
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.cart).toHaveLength(0);
  });
});