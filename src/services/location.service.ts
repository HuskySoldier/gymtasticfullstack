/**
 * Servicio simulado para obtener Regiones y Comunas de Chile.
 */

export interface Region {
  id: number;
  name: string;
  communes: string[];
}

// Nuestra "base de datos" simulada de ubicaciones
const CHILE_LOCATIONS: Region[] = [
  {
    id: 1,
    name: 'Región de Arica y Parinacota',
    communes: ['Arica', 'Camarones', 'Putre', 'General Lagos']
  },
  {
    id: 2,
    name: 'Región de Tarapacá',
    communes: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica']
  },
  {
    id: 3,
    name: 'Región de Antofagasta',
    communes: ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Tocopilla', 'María Elena']
  },
  {
    id: 4,
    name: 'Región de Atacama',
    communes: ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Freirina', 'Huasco', 'Alto del Carmen']
  },
  {
    id: 5,
    name: 'Región de Coquimbo',
    communes: [
      'La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paihuano', 'Vicuña',
      'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado'
    ]
  },
  {
    id: 6,
    name: 'Región de Valparaíso',
    communes: [
      'Valparaíso', 'Viña del Mar', 'Concón', 'Quintero', 'Puchuncaví', 'Casablanca', 'Juan Fernández',
      'San Antonio', 'Cartagena', 'El Tabo', 'El Quisco', 'Algarrobo', 'Santo Domingo',
      'Quillota', 'La Calera', 'La Cruz', 'Nogales', 'Hijuelas',
      'Limache', 'Olmué', 'Villa Alemana', 'Quilpué', 'Isla de Pascua'
    ]
  },
  {
    id: 7,
    name: 'Región Metropolitana de Santiago',
    communes: [
      'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central', 'Huechuraba', 'Independencia',
      'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea',
      'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia',
      'Pudahuel', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín', 'San Miguel', 'San Ramón',
      'Santiago', 'Vitacura', 'Puente Alto', 'San Bernardo', 'Pirque', 'Buin', 'Paine', 'Calera de Tango',
      'Colina', 'Lampa', 'Tiltil', 'Melipilla', 'Curacaví', 'María Pinto', 'San Pedro', 'Talagante', 'Peñaflor', 'El Monte', 'Isla de Maipo'
    ]
  },
  {
    id: 8,
    name: 'Región del Libertador General Bernardo O’Higgins',
    communes: [
      'Rancagua', 'Machalí', 'Graneros', 'Mostazal', 'Codegua', 'Requínoa', 'Olivar', 'Doñihue',
      'Coinco', 'Coltauco', 'San Vicente', 'Peumo', 'Pichidegua', 'Las Cabras', 'Malloa', 'San Fernando',
      'Chimbarongo', 'Nancagua', 'Placilla', 'Santa Cruz', 'Palmilla', 'Peralillo', 'Lolol', 'Pumanque',
      'Pichilemu', 'Marchigüe', 'Navidad', 'La Estrella', 'Litueche'
    ]
  },
  {
    id: 9,
    name: 'Región del Maule',
    communes: [
      'Talca', 'San Clemente', 'Pelarco', 'Río Claro', 'Maule', 'San Rafael', 'Curepto', 'Constitución',
      'Empedrado', 'Pencahue', 'Curicó', 'Teno', 'Romeral', 'Rauco', 'Sagrada Familia', 'Hualañé',
      'Licantén', 'Vichuquén', 'Linares', 'Colbún', 'Yerbas Buenas', 'Longaví', 'Retiro', 'Parral', 'Cauquenes', 'Chanco', 'Pelluhue'
    ]
  },
  {
    id: 10,
    name: 'Región de Ñuble',
    communes: [
      'Chillán', 'Chillán Viejo', 'Bulnes', 'Quillón', 'San Ignacio', 'El Carmen', 'Pemuco',
      'Yungay', 'Ñiquén', 'San Carlos', 'San Nicolás', 'Coihueco', 'Pinto', 'Treguaco', 'Cobquecura', 'Quirihue', 'Ninhue', 'Portezuelo', 'Ránquil'
    ]
  },
  {
    id: 11,
    name: 'Región del Biobío',
    communes: [
      'Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Hualpén', 'Chiguayante', 'Coronel', 'Lota', 'Penco', 'Tomé', 'Florida', 'Hualqui',
      'Santa Juana', 'Cabrero', 'Yumbel', 'Nacimiento', 'Laja', 'Los Ángeles', 'Mulchén', 'Negrete', 'Quilaco', 'Quilleco', 'Santa Bárbara', 'Tucapel', 'Alto Biobío', 'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Lebu', 'Los Álamos', 'Tirúa'
    ]
  },
  {
    id: 12,
    name: 'Región de La Araucanía',
    communes: [
      'Temuco', 'Padre Las Casas', 'Vilcún', 'Freire', 'Pitrufquén', 'Gorbea', 'Lautaro', 'Perquenco', 'Melipeuco',
      'Curarrehue', 'Pucón', 'Villarrica', 'Toltén', 'Teodoro Schmidt', 'Carahue', 'Nueva Imperial', 'Saavedra',
      'Cholchol', 'Angol', 'Renaico', 'Collipulli', 'Ercilla', 'Purén', 'Los Sauces', 'Lumaco', 'Traiguén', 'Victoria'
    ]
  },
  {
    id: 13,
    name: 'Región de Los Ríos',
    communes: [
      'Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli',
      'La Unión', 'Río Bueno', 'Futrono', 'Lago Ranco'
    ]
  },
  {
    id: 14,
    name: 'Región de Los Lagos',
    communes: [
      'Puerto Montt', 'Puerto Varas', 'Cochamó', 'Fresia', 'Frutillar', 'Llanquihue', 'Los Muermos', 'Maullín', 'Calbuco',
      'Osorno', 'San Juan de la Costa', 'San Pablo', 'Río Negro', 'Purranque', 'Puerto Octay', 'Puyehue', 'Río Negro',
      'Chaitén', 'Futaleufú', 'Hualaihué', 'Palena', 'Castro', 'Ancud', 'Quellón', 'Dalcahue', 'Curaco de Vélez', 'Puqueldón', 'Queilén', 'Quemchi', 'Quinchao'
    ]
  },
  {
    id: 15,
    name: 'Región de Aysén del General Carlos Ibáñez del Campo',
    communes: [
      'Coyhaique', 'Lago Verde', 'Aysén', 'Cisnes', 'Guaitecas', 'Cochrane', 'O’Higgins', 'Tortel', 'Chile Chico', 'Río Ibáñez'
    ]
  },
  {
    id: 16,
    name: 'Región de Magallanes y de la Antártica Chilena',
    communes: [
      'Punta Arenas', 'Río Verde', 'Laguna Blanca', 'San Gregorio', 'Porvenir', 'Primavera', 'Timaukel', 'Natales', 'Torres del Paine', 'Antártica'
    ]
  }
];

/**
 * Obtiene una lista de todos los nombres de las regiones.
 */
export const getRegions = async (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CHILE_LOCATIONS.map(r => r.name));
    }, 150); // Simula una pequeña demora de red
  });
};

/**
 * Obtiene la lista de comunas para una región específica.
 */
export const getCommunesByRegion = async (regionName: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const region = CHILE_LOCATIONS.find(r => r.name === regionName);
      resolve(region ? region.communes.sort() : []); // Devuelve las comunas ordenadas
    }, 100);
  });
};
