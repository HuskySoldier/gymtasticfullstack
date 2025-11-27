// src/services/user.service.ts

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Cliente';
  password?: string; 
  // Nuevos campos opcionales para el perfil
  fono?: string;
  avatarUri?: string;
  planEndMillis?: number;
}

// --- 1. DEFINIMOS LA INTERFAZ DEL BACKEND (Java DTO) ---
interface BackendUser {
  email: string;
  nombre: string;
  rol: string;
  fono?: string;
  avatarUri?: string;
  planEndMillis?: number;
  // Otros campos que vienen del backend pero quizás no usamos aun:
  sedeId?: number;
  sedeName?: string;
  bio?: string;
}

// URLs de tus microservicios
const USER_API = 'http://localhost:8082/users';
const REGISTER_API = 'http://localhost:8084/register';
const LOGIN_API = 'http://localhost:8083/login';

// --- 2. USAMOS LA INTERFAZ EN EL MAPPER ---
const mapUser = (data: BackendUser): User => ({
  id: 0, // Placeholder numérico
  name: data.nombre,
  email: data.email,
  role: (data.rol && data.rol.toLowerCase() === 'admin') ? 'Admin' : 'Cliente',
  fono: data.fono,
  avatarUri: data.avatarUri,
  planEndMillis: data.planEndMillis
});

// --- FUNCIÓN PARA EL LOGIN ---
export const loginUserReal = async (credentials: {email:string, password:string}) => {
    try {
        const response = await fetch(LOGIN_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        if(!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, message: errorData.message || 'Error de credenciales' };
        }
        
        return await response.json(); // Devuelve { success, token, user: BackendUser }
    } catch (error) {
        console.error("Error en loginUserReal:", error);
        return { success: false, message: 'Error de conexión con el servidor' };
    }
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const payload = {
    nombre: userData.name,
    email: userData.email,
    password: userData.password
  };

  const response = await fetch(REGISTER_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Error al registrar usuario');
  }
  
  return { ...userData, id: 0, role: 'Cliente' } as User;
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(USER_API); 
    if (!response.ok) return [];
    
    // --- 3. TIPAMOS LA RESPUESTA JSON ---
    const data: BackendUser[] = await response.json();
    return data.map(mapUser);
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
    const users = await getUsers();
    return users.find(u => u.id === id) || null;
};

export const updateUser = async (id: number, updates: Partial<User>): Promise<User | null> => {
    if(!updates.email) return null;

    const payload = {
        nombre: updates.name,
        fono: updates.fono,
        bio: '', 
        avatarUri: updates.avatarUri
    };

    try {
        const response = await fetch(`${USER_API}/${updates.email}/profile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if(response.ok) {
            const updatedData: BackendUser = await response.json();
            return mapUser(updatedData);
        }
    } catch (e) {
        console.error(e);
    }
    return null;
};

export const deleteUser = async (id: number): Promise<boolean> => {
    const user = await getUserById(id);
    if(!user) return false;

    try {
        const response = await fetch(`${USER_API}/${user.email}`, { method: 'DELETE' });
        return response.ok;
    } catch (e) {
        console.error(e);
        return false;
    }
};