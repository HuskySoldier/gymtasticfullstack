import { describe, it, expect } from 'vitest';
import { formatCurrency, formatStock } from './format.helpers';

describe('Format Helpers', () => {
  it('formatCurrency debe formatear correctamente a CLP', () => {
    const price = 15000;
    // Nota: El espacio puede ser un espacio normal o un espacio de no separación (\xa0)
    // Usamos match para ser flexibles con el tipo de espacio
    expect(formatCurrency(price)).toMatch(/\$15.000/);
  });

  it('formatStock debe manejar el stock infinito', () => {
    expect(formatStock(Infinity)).toBe('Ilimitado');
  });

  it('formatStock debe manejar stock numérico', () => {
    expect(formatStock(50)).toBe('50');
  });

  it('formatStock debe manejar nulos o indefinidos', () => {
    expect(formatStock(null)).toBe('No disp.');
    expect(formatStock(undefined)).toBe('No disp.');
  });
});