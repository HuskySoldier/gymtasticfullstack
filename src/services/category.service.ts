import { getProducts } from './product.service';

export interface Category {
  id: number;
  name: string;
}

/**
 * Obtiene las categorías dinámicamente extrayéndolas de los productos existentes.
 * Cumple el requisito de no usar bases de datos locales.
 */
export const getCategories = async (): Promise<Category[]> => {
  try {
    // 1. Obtenemos los productos reales del backend
    const response = await getProducts();
    
    if (!response.ok) return [];

    // 2. Extraemos las categorías únicas (Set elimina duplicados)
    const uniqueCategoryNames = [...new Set(response.products.map(p => p.category))];

    // 3. Mapeamos a la interfaz Category
    return uniqueCategoryNames.map((name, index) => ({
      id: index + 1,
      name: name
    }));
  } catch (error) {
    console.error("Error obteniendo categorías dinámicas:", error);
    return [];
  }
};

// --- Métodos "Dummy" para Admin (ya que no hay tabla de categorías) ---
// Advierten que la gestión depende de los productos.

export const createCategory = async (name: string): Promise<Category> => {
  console.warn("Backend: Crea un producto con esta categoría para que aparezca.");
  return { id: Date.now(), name };
};

export const updateCategory = async (id: number, name: string): Promise<Category | null> => {
  console.warn("Backend: Para renombrar, edita la categoría en los productos.");
  return { id, name };
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  console.warn(`Backend: Simulando eliminación de cat ${id}. Borra los productos asociados para eliminarla realmente.`);
  return true;
};