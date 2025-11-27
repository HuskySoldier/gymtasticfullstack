import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { describe, it, expect, beforeEach } from 'vitest';
import type { User } from '../services/user.service';

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@gym.com',
  role: 'Cliente'
};

describe('AuthContext', () => {
  // Limpiar localStorage antes de cada prueba
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe iniciar sin usuario autenticado', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('login debe actualizar el usuario y isAuthenticated', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.login(mockUser);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
  });

  it('logout debe limpiar el usuario', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    // Primero logueamos
    act(() => {
      result.current.login(mockUser);
    });

    // Luego deslogueamos
    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});