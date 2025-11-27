import { describe, it, expect } from 'vitest';
import { validateRegistration, type RegisterFormData } from './validation.helpers';

describe('Validation Helpers', () => {
  const validData: RegisterFormData = {
    nombre: 'Juan',
    apellidos: 'Pérez',
    email: 'juan@test.com',
    password: 'password123',
    confirmPassword: 'password123'
  };

  it('debe retornar válido si todos los datos son correctos', () => {
    const result = validateRegistration(validData);
    expect(result.isValid).toBe(true);
    expect(result.message).toBeNull();
  });

  it('debe fallar si las contraseñas no coinciden', () => {
    const invalidData = { ...validData, confirmPassword: 'otra' };
    const result = validateRegistration(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Las contraseñas no coinciden.');
  });

  it('debe fallar si el email es inválido', () => {
    const invalidData = { ...validData, email: 'juan-sin-arroba' };
    const result = validateRegistration(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('correo electrónico válido');
  });

  it('debe fallar si la contraseña es muy corta', () => {
    const invalidData = { ...validData, password: '123', confirmPassword: '123' };
    const result = validateRegistration(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('al menos 6 caracteres');
  });
});