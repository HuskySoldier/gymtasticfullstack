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
 * Ejemplo: null -> "No disp."
 */
export const formatStock = (stock: number | null | undefined): string => {
  
  // --- ESTA ES LA LÍNEA NUEVA ---
  // Si el stock es nulo o indefinido, devuelve un texto alternativo
  if (stock === null || stock === undefined) {
    return 'No disp.';
  }
  // --- FIN DE LA LÍNEA NUEVA ---

  if (stock === Infinity) {
    return 'Ilimitado';
  }
  
  return stock.toString();
};