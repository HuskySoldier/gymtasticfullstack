import { describe, it, expect, vi, afterEach } from 'vitest';
import { getProducts } from './product.service';

// Mock global de fetch
global.fetch = vi.fn();

describe('Product Service', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getProducts debe mapear los datos del backend correctamente', async () => {
    // Respuesta simulada del Backend (Java)
    const mockBackendResponse = [
      {
        id: 1,
        nombre: 'Plan Mensual', // Note que es 'nombre' en español
        descripcion: 'Acceso total',
        precio: 20000,
        stock: 9999, // Backend envía esto para infinito
        tipo: 'plan',
        img: 'http://img.com/1.jpg'
      }
    ];

    // --- CORRECCIÓN 1: Usamos vi.mocked() y 'as Response' ---
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockBackendResponse),
    } as Response);

    const result = await getProducts();

    expect(result.ok).toBe(true);
    expect(result.products).toHaveLength(1);
    
    // Verificamos el mapeo a Frontend
    const product = result.products[0];
    expect(product.name).toBe('Plan Mensual'); 
    expect(product.category).toBe('Membresías'); 
    expect(product.price).toBe(20000);
  });

  it('debe manejar errores de la API', async () => {
    // --- CORRECCIÓN 2: Usamos vi.mocked() ---
    vi.mocked(fetch).mockRejectedValue(new Error('API Down'));

    const result = await getProducts();

    expect(result.ok).toBe(false);
    expect(result.products).toEqual([]);
  });
});