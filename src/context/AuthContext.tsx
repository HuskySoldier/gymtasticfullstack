import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../services/user.service'; 

// --- 1. Define una llave para el localStorage ---
const USER_STORAGE_KEY = 'gymtastic_user';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  
  // --- 2. Modifica el useState para LEER de localStorage ---
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        return JSON.parse(storedUser); // Si hay un usuario, lo usamos
      }
    } catch (error) {
      console.error("Error al leer el usuario de localStorage", error);
      localStorage.removeItem(USER_STORAGE_KEY); // Limpia si está corrupto
    }
    return null; // Estado inicial por defecto
  });

  // --- 3. Modifica 'login' para ESCRIBIR en localStorage ---
  const login = (userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error("Error al guardar el usuario en localStorage", error);
    }
  };

  // --- 4. Modifica 'logout' para BORRAR de localStorage ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const isAuthenticated = !!user; 

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook (este no cambia)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};