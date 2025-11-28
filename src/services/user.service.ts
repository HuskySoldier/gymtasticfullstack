export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Cliente';
  password?: string; 
  fono?: string;
  avatarUri?: string;
  planEndMillis?: number;
}

// --- HELPER: Obtener cabeceras con Token ---
const getAuthHeaders = () => {
  const token = localStorage.getItem('gym_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

interface BackendUser {
  email: string;
  nombre: string;
  rol: string;
  fono?: string;
  avatarUri?: string;
  planEndMillis?: number;
  passHash?: string;
}

// URLs de tus microservicios
const USER_API = 'http://localhost:8082/users';
const REGISTER_API = 'http://localhost:8084/register';
const LOGIN_API = 'http://localhost:8083/login';

const mapUser = (data: BackendUser): User => ({
  id: 0, 
  name: data.nombre,
  email: data.email,
  role: (data.rol && data.rol.toLowerCase() === 'admin') ? 'Admin' : 'Cliente',
  fono: data.fono,
  avatarUri: data.avatarUri,
  planEndMillis: data.planEndMillis
});

// --- PÚBLICO: Login (Recibe el token, no lo envía) ---
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
        
        return await response.json(); 
    } catch (error) {
        console.error("Error en loginUserReal:", error);
        return { success: false, message: 'Error de conexión con el servidor' };
    }
};

// --- PÚBLICO: Registro ---
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

// --- PROTEGIDO: Obtener Usuarios (Admin) ---
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(USER_API, {
        headers: getAuthHeaders() // <--- Token incluido
    }); 
    if (!response.ok) return [];
    
    const data: BackendUser[] = await response.json();
    return data.map(mapUser);
  } catch (e) {
    console.error(e);
    return [];
  }
};

// --- PROTEGIDO: Obtener Usuario por ID (Simulado buscando por email en la lista o endpoint específico) ---
export const getUserById = async (id: number): Promise<User | null> => {
    // Nota: Como tu User tiene ID numérico en front pero string email en backend,
    // esto es una adaptación. Idealmente deberías buscar por email.
    const users = await getUsers();
    return users.find(u => u.id === id) || null;
};

// --- PROTEGIDO: Actualizar Perfil ---
export const updateUser = async (_id: number, updates: Partial<User>): Promise<User | null> => {
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
            headers: getAuthHeaders(), // <--- Token incluido
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

// --- PROTEGIDO: Eliminar Usuario (Admin) ---
export const deleteUser = async (id: number): Promise<boolean> => {
    // Primero necesitamos el email para borrar en el backend
    const user = await getUserById(id);
    if(!user) return false;

    try {
        const response = await fetch(`${USER_API}/${user.email}`, { 
            method: 'DELETE',
            headers: getAuthHeaders() // <--- Token incluido
        });
        return response.ok;
    } catch (e) {
        console.error(e);
        return false;
    }
};