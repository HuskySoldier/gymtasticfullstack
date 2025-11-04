import type { Product } from '../interfaces/app.interfaces';

// Creamos nuestra base de datos simulada (Mock DB) para el Gimnasio
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Membresía Mensual",
    description: "Acceso ilimitado a todas las máquinas y áreas de peso libre. Incluye evaluación inicial.",
    image: "https://placehold.co/400x400/EBF5FB/1A5276?text=Membresía+Mensual",
    price: 30000,
    stock: Infinity, // Las membresías no tienen stock
    category: 'Membresías'
  },
  {
    id: 2,
    name: "Plan Trimestral",
    description: "Tres meses de acceso completo con descuento. Incluye 2 sesiones de entrenador personal.",
    image: "https://placehold.co/400x400/E8F8F5/186A3B?text=Plan+Trimestral",
    price: 80000,
    stock: Infinity,
    category: 'Membresías'
  },
  {
    id: 3,
    name: "Proteína Whey 5Lbs",
    description: "Proteína de suero de leche de alta calidad, sabor vainilla. 25g de proteína por porción.",
    image: "https://placehold.co/400x400/F4ECF7/6C3483?text=Proteína+Whey",
    price: 45000,
    stock: 50,
    category: 'Suplementos'
  },
  {
    id: 4,
    name: "Creatina Monohidratada 300g",
    description: "Aumenta tu fuerza y rendimiento. Creatina pura micronizada.",
    image: "https://placehold.co/400x400/FEF9E7/B9770E?text=Creatina",
    price: 25000,
    stock: 75,
    category: 'Suplementos'
  },
  {
    id: 5,
    name: "Polera Deportiva Dry-Fit",
    description: "Polera técnica para entrenamiento, repele el sudor y te mantiene fresco.",
    image: "https://placehold.co/400x400/FDEDEC/943126?text=Polera+Dry-Fit",
    price: 15000,
    stock: 120,
    category: 'Ropa'
  },
  {
    id: 6,
    name: "Set de Mancuernas 10kg",
    description: "Par de mancuernas hexagonales de 10kg cada una, recubiertas en goma.",
    image: "https://placehold.co/400x400/E5E7E9/424949?text=Mancuernas+10kg",
    price: 35000,
    stock: 30,
    category: 'Equipamiento'
  }
];

