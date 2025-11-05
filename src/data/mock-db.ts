import type { Product } from '../interfaces/app.interfaces';

// Base de datos simulada con imágenes profesionales
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Membresía Mensual",
    description: "Acceso ilimitado a todas las máquinas y áreas de peso libre. Incluye evaluación inicial.",
    image: "/imagenes/Mensual.png", // <-- IMAGEN REAL
    price: 30000,
    stock: Infinity,
    category: 'Membresías'
  },
  {
    id: 2,
    name: "Plan Trimestral",
    description: "Tres meses de acceso completo con descuento. Incluye 2 sesiones de entrenador personal.",
    image: "/imagenes/Trimestral.png", // <-- IMAGEN REAL
    price: 80000,
    stock: Infinity,
    category: 'Membresías'
  },
  {
    id: 3,
    name: "Proteína Whey 5Lbs",
    description: "Proteína de suero de leche de alta calidad, sabor vainilla. 25g de proteína por porción.",
    image: "/imagenes/Proteina.png", // <-- IMAGEN REAL
    price: 45000,
    stock: 50,
    category: 'Suplementos'
  },
  {
    id: 4,
    name: "Creatina Monohidratada 300g",
    description: "Aumenta tu fuerza y rendimiento. Creatina pura micronizada.",
    image: "/imagenes/Creatina.jpg", // <-- IMAGEN REAL
    price: 25000,
    stock: 75,
    category: 'Suplementos'
  },
  {
    id: 5,
    name: "Polera Deportiva Dry-Fit",
    description: "Polera técnica para entrenamiento, repele el sudor y te mantiene fresco.",
    image: "/imagenes/Polera.png", // <-- IMAGEN REAL
    price: 15000,
    stock: 120,
    category: 'Ropa'
  },
  {
    id: 6,
    name: "Set de Mancuernas 10kg",
    description: "Par de mancuernas hexagonales de 10kg cada una, recubiertas en goma.",
    image: "/imagenes/Mancuernas.jpg", // <-- IMAGEN REAL
    price: 35000,
    stock: 30,
    category: 'Equipamiento'
  }
];

