/**
 * Formatea un número como moneda chilena (CLP).
 * Ejemplo: 45000 -> "$45.000"
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0, // No mostrar decimales
  }).format(value);
};

/**
 * Formatea el stock para mostrar "Ilimitado" en lugar de "Infinity".
 * Ejemplo: Infinity -> "Ilimitado"
 * Ejemplo: 50 -> "50"
 */
export const formatStock = (stock: number): string => {
  if (stock === Infinity) {
    return 'Ilimitado';
  }
  return stock.toString();
};