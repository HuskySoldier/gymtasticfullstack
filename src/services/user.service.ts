export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Cliente';
  // En una app real, nunca guardaríamos la contraseña en texto plano
  // pero para esta simulación, es necesario para el formulario de "editar"
  password?: string; 
}

// Simulación de BBDD de Usuarios en memoria
let mockUsers: User[] = [
  { id: 1, name: 'Pedro Hacker', email: 'pedro.hacker20@example.com', role: 'Cliente' },
  { id: 2, name: 'Admin GYMTASTIC', email: 'admin@gym.com', role: 'Admin' },
  { id: 3, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Cliente' },
];

let nextId = 4;

/**
 * Obtiene todos los usuarios.
 */
export const getUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockUsers]); // Devuelve una copia
    }, 200);
  });
};

/**
 * (ESTA ES LA FUNCIÓN INTEGRADA)
 * Obtiene un usuario por su ID.
 */
export const getUserById = async (id: number): Promise<User | null> => {
  return new Promise((resolve) => {
    const user = mockUsers.find(u => u.id === id);
    setTimeout(() => {
      resolve(user || null);
    }, 200);
  });
};

/**
 * Crea un nuevo usuario.
 */
export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  return new Promise((resolve) => {
    const newUser: User = { ...userData, id: nextId++ };
    mockUsers.push(newUser);
    setTimeout(() => {
      resolve(newUser);
    }, 200);
  });
};

/**
 * Actualiza un usuario existente.
 */
export const updateUser = async (id: number, updates: Partial<Omit<User, 'id'>>): Promise<User | null> => {
  return new Promise((resolve) => {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      // Combina el usuario existente con las actualizaciones
      mockUsers[index] = { ...mockUsers[index], ...updates };
      setTimeout(() => {
        resolve(mockUsers[index]);
      }, 200);
    } else {
      resolve(null);
    }
  });
};

/**
 * Elimina un usuario.
 */
export const deleteUser = async (id: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
      setTimeout(() => {
        resolve(true);
      }, 200);
    } else {
      resolve(false);
    }
  });
};