// Definimos la forma de los datos que vamos a validar
export interface RegisterFormData {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Definimos la forma de nuestra respuesta de validación
export interface ValidationResult {
  isValid: boolean;
  message: string | null;
}

/**
 * Valida los datos del formulario de registro.
 * Devuelve un objeto con el resultado de la validación.
 */
export const validateRegistration = (data: RegisterFormData): ValidationResult => {
  const { nombre, apellidos, email, password, confirmPassword } = data;

  // 1. Validación de campos vacíos (Mejorada con trim)
  if (!nombre.trim() || !apellidos.trim() || !email.trim() || !password || !confirmPassword) {
    return { isValid: false, message: 'Por favor, completa todos los campos.' };
  }

  // 2. Validación: Largo de Nombre y Apellido
  if (nombre.trim().length < 2) {
    return { isValid: false, message: 'El nombre debe tener al menos 2 caracteres.' };
  }
  if (apellidos.trim().length < 2) {
    return { isValid: false, message: 'Los apellidos deben tener al menos 2 caracteres.' };
  }

  // 3. Validación: Formato de Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Por favor, ingresa un correo electrónico válido.' };
  }
  
  // 4. Validación: Largo de Contraseña
  if (password.length < 6) {
    return { isValid: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
  }

  // 5. Validación de coincidencia
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Las contraseñas no coinciden.' };
  }

  // Si todo pasa, es válido
  return { isValid: true, message: null };
};