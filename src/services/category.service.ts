export interface Category {
  id: number;
  name: string;
}

// Simulación de BBDD en memoria. Esta es ahora la "fuente de verdad".
let mockCategories: Category[] = [
  { id: 1, name: 'Membresías' },
  { id: 2, name: 'Suplementos' },
  { id: 3, name: 'Ropa' },
  { id: 4, name: 'Equipamiento' },
];

// Simula un ID autoincremental
let nextId = 5;

/**
 * Obtiene todas las categorías.
 */
export const getCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockCategories]); // Devuelve una copia
    }, 200);
  });
};

/**
 * Crea una nueva categoría.
 */
export const createCategory = async (name: string): Promise<Category> => {
  return new Promise((resolve) => {
    const newCategory: Category = { id: nextId++, name };
    mockCategories.push(newCategory);
    setTimeout(() => {
      resolve(newCategory);
    }, 200);
  });
};

/**
 * Actualiza una categoría existente.
 */
export const updateCategory = async (id: number, name: string): Promise<Category | null> => {
  return new Promise((resolve) => {
    const index = mockCategories.findIndex(cat => cat.id === id);
    if (index !== -1) {
      mockCategories[index].name = name;
      setTimeout(() => {
        resolve(mockCategories[index]);
      }, 200);
    } else {
      resolve(null);
    }
  });
};

/**
 * Elimina una categoría.
 */
export const deleteCategory = async (id: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const index = mockCategories.findIndex(cat => cat.id === id);
    if (index !== -1) {
      mockCategories.splice(index, 1);
      setTimeout(() => {
        resolve(true);
      }, 200);
    } else {
      resolve(false);
    }
  });
};