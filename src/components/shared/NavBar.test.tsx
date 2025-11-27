import { render, screen } from '@testing-library/react';
import { NavBar } from './NavBar';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

// Mockeamos los hooks
vi.mock('../../context/AuthContext');
vi.mock('../../context/CartContext');

describe('NavBar Component', () => {
  // Configuración por defecto de los mocks
  const mockUseAuth = useAuth as unknown as ReturnType<typeof vi.fn>;
  const mockUseCart = useCart as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUseCart.mockReturnValue({ cart: [] }); // Carrito vacío por defecto
  });

  it('muestra botones de Login y Registro cuando NO está autenticado', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null
    });

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByText('Crear Cuenta')).toBeInTheDocument();
    expect(screen.queryByText(/Hola/)).not.toBeInTheDocument();
  });

  it('muestra el nombre del usuario cuando SÍ está autenticado', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'Admin User', role: 'Admin' },
      logout: vi.fn()
    });

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Busca el texto "Hola, Admin" (por el split del nombre)
    expect(screen.getByText(/Hola, Admin/i)).toBeInTheDocument();
    expect(screen.queryByText('Iniciar Sesión')).not.toBeInTheDocument();
  });
});