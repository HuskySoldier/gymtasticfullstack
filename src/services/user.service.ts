export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Cliente';
  password?: string; 
}

// --- 1. Definimos la llave para el localStorage ---
const USERS_STORAGE_KEY = 'gymtastic_users_db';

// --- 2. Definimos los usuarios iniciales (solo para la primera carga) ---
const INITIAL_MOCK_USERS: User[] = [
  { id: 1, name: 'Pedro Hacker', email: 'pedro.hacker20@example.com', role: 'Cliente', password: '123' },
  { id: 2, name: 'Admin GYMTASTIC', email: 'admin@gym.com', role: 'Admin', password: 'admin' },
  { id: 3, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Cliente', password: '123' },
];

// --- 3. HELPER: Obtener usuarios de localStorage ---
const getUsersFromStorage = (): User[] => {
  try {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    // Si hay usuarios guardados, los devolvemos
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
  } catch (error) {
    console.error("Error al leer usuarios de localStorage", error);
    localStorage.removeItem(USERS_STORAGE_KEY); // Limpia datos corruptos
  }
  
  // Si no hay nada, guardamos y devolvemos la lista inicial
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_USERS));
  return INITIAL_MOCK_USERS;
};

// --- 4. HELPER: Guardar usuarios en localStorage ---
const saveUsersToStorage = (users: User[]): void => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error al guardar usuarios en localStorage", error);
  }
};

// --- 5. Nuestra "BBDD" en memoria ahora lee de localStorage ---
let mockUsers: User[] = getUsersFromStorage();

// Calculamos el siguiente ID basado en lo que cargamos
let nextId = Math.max(...mockUsers.map(u => u.id)) + 1;

/**
 * Obtiene todos los usuarios (desde la variable en memoria).
 */
export const getUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockUsers]); // Devuelve una copia
    }, 100); // Hacemos la simulación más rápida
  });
};

/**
 * Obtiene un usuario por su ID (desde la variable en memoria).
 */
export const getUserById = async (id: number): Promise<User | null> => {
  return new Promise((resolve) => {
    const user = mockUsers.find(u => u.id === id);
    setTimeout(() => {
      resolve(user || null);
    }, 100);
  });
};

/**
 * Crea un nuevo usuario y LO GUARDA EN LOCALSTORAGE.
 */
export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  return new Promise((resolve) => {
    const newUser: User = { ...userData, id: nextId++ };
    
    mockUsers.push(newUser); // Actualiza la variable
    saveUsersToStorage(mockUsers); // <--- GUARDA EN LOCALSTORAGE
    
    setTimeout(() => {
      resolve(newUser);
    }, 200);
  });
};

/**
 * Actualiza un usuario existente y LO GUARDA EN LOCALSTORAGE.
 */
export const updateUser = async (id: number, updates: Partial<Omit<User, 'id'>>): Promise<User | null> => {
  return new Promise((resolve) => {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...updates }; // Actualiza la variable
      
      saveUsersToStorage(mockUsers); // <--- GUARDA EN LOCALSTORAGE
      
      setTimeout(() => {
        resolve(mockUsers[index]);
      }, 200);
    } else {
      resolve(null);
    }
  });
};

/**
 * Elimina un usuario y LO GUARDA EN LOCALSTORAGE.
 */
export const deleteUser = async (id: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1); // Actualiza la variable
      
      saveUsersToStorage(mockUsers); // <--- GUARDA EN LOCALSTORAGE
      
      setTimeout(() => {
        resolve(true);
      }, 200);
    } else {
      resolve(false);
    }
  });
};