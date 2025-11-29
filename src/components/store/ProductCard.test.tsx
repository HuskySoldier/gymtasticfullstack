import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import type { Product } from '../../interfaces/app.interfaces';

// Mock del contexto (Simulamos addToCart)
const mockAddToCart = vi.fn();

// Interceptamos el uso de useCart
vi.mock('../../context/CartContext', () => ({
  useCart: () => ({
    addToCart: mockAddToCart
  })
}));

const productMock: Product = {
  id: 99,
  name: 'Mancuernas Pro',
  description: 'Mancuernas de acero',
  price: 50000,
  image: 'test.jpg',
  stock: 5,
  category: 'Equipamiento'
};

describe('ProductCard Component', () => {
  it('debe renderizar la información del producto correctamente', () => {
    render(
      <BrowserRouter>
        <ProductCard product={productMock} />
      </BrowserRouter>
    );

    // Verificamos que el nombre y precio aparezcan en pantalla
    expect(screen.getByText('Mancuernas Pro')).toBeInTheDocument();
    // Nota: El precio se formatea, buscamos parte del texto
    expect(screen.getByText(/\$50.000/)).toBeInTheDocument();
  });

  it('debe llamar a addToCart cuando se hace clic en el botón', () => {
    render(
      <BrowserRouter>
        <ProductCard product={productMock} />
      </BrowserRouter>
    );

    // Buscamos el botón que contiene "Añadir" o el icono
    const addButton = screen.getByRole('button', { name: /en Stock/i });
    
    // Simulamos el clic
    fireEvent.click(addButton);

    // Verificamos que la función fue llamada con el producto y cantidad 1
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(productMock, 1);
  });

  it('el botón debe estar deshabilitado si no hay stock', () => {
    const noStockProduct = { ...productMock, stock: 0 };
    
    render(
      <BrowserRouter>
        <ProductCard product={noStockProduct} />
      </BrowserRouter>
    );

    // CAMBIO: Busca "Sin Stock" en lugar de "Agotado"
    const button = screen.getByRole('button', { name: /Sin Stock/i });
    
    expect(button).toBeDisabled();
  });
});