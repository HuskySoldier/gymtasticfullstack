import { render, screen, waitFor } from '@testing-library/react';
import { CategoriesPage } from './CategoriesPage';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import * as productService from '../../services/product.service';
import type { Product } from '../../interfaces/app.interfaces';

// Mockeamos el servicio de productos
vi.mock('../../services/product.service');

// --- SOLUCIÓN: Mockeamos los hooks de contexto que usa NavBar ---
// Esto evita el error "useCart debe ser usado dentro de un CartProvider"
vi.mock('../../context/CartContext', () => ({
  useCart: () => ({
    cart: [],
    getTotalPrice: () => 0
  })
}));

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    logout: vi.fn()
  })
}));

describe('CategoriesPage', () => {
  it('renderiza las categorías basadas en los productos obtenidos', async () => {
    // Simulamos la respuesta del servicio
    const mockProducts: Product[] = [
      { 
        id: 1, 
        category: 'Suplementos', 
        name: 'Whey', 
        description: '', price: 0, image: '', stock: 0 
      },
      { 
        id: 2, 
        category: 'Ropa', 
        name: 'Polera',
        description: '', price: 0, image: '', stock: 0 
      }
    ];

    vi.mocked(productService.getProducts).mockResolvedValue({
      ok: true,
      statusCode: 200,
      products: mockProducts
    });

    render(
      <BrowserRouter>
        <CategoriesPage />
      </BrowserRouter>
    );

    // Esperamos a que aparezcan las categorías
    await waitFor(() => {
      expect(screen.getByText('Suplementos')).toBeInTheDocument();
      expect(screen.getByText('Ropa')).toBeInTheDocument();
    });
  });
});