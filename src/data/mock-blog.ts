export interface BlogPost {
  image: string | undefined;
  id: number;
  slug: string; // Para la URL
  title: string;
  excerpt: string;
  author: string;
  date: string;
  content: string; // Contenido HTML
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    slug: '5-ejercicios-esenciales-de-espalda',
    title: '5 Ejercicios Esenciales para una Espalda Fuerte',
    excerpt: 'Descubre los 5 ejercicios clave que no pueden faltar en tu rutina de espalda para construir músculo y fuerza...',
    image: '/imagenes/ejercicios.jpg',
    author: 'GYMTASTIC Team',
    date: '03 Nov, 2025',
    content: `
      <p>Construir una espalda fuerte y definida no solo es estético, sino fundamental para una buena postura y para levantar más peso en otros ejercicios. Aquí te dejamos 5 ejercicios que no pueden faltar.</p>
      
      <h3>1. Peso Muerto (Deadlift)</h3>
      <p>El rey de los ejercicios. Trabaja toda la cadena posterior, desde los isquiotibiales hasta los trapecios. La técnica es crucial, así que asegúrate de mantener la espalda recta.</p>
      
      <h3>2. Dominadas (Pull-ups)</h3>
      <p>Nada construye una espalda ancha (los "dorsales") como las dominadas. Si no puedes hacerlas, empieza con jalones en polea (lat pulldowns) o usando bandas de asistencia.</p>
      
      <h3>3. Remo con Barra (Barbell Row)</h3>
      <p>Este ejercicio es clave para la "densidad" de la espalda. Enfócate en "remar" la barra hacia tu esternón, apretando los omóplatos en la parte superior del movimiento.</p>
      
      <h3>4. Remo con Mancuerna (Dumbbell Row)</h3>
      <p>Excelente para trabajar cada lado de la espalda de forma individual, corrigiendo desbalances musculares y permitiendo un rango de movimiento más profundo.</p>
      
      <h3>5. Jalón al Pecho (Lat Pulldown)</h3>
      <p>El sustituto o complemento perfecto de las dominadas. Permite controlar el peso de forma precisa y es ideal para series de altas repeticiones.</p>
      
      <blockquote>Recuerda: la consistencia y la sobrecarga progresiva son las claves del éxito. ¡No te rindas!</blockquote>
    `
  },
  {
    id: 2,
    slug: 'la-verdad-sobre-la-creatina',
    title: 'La Verdad Sobre la Creatina: Mitos vs. Realidad',
    excerpt: '¿Es segura? ¿Realmente funciona? Desmentimos los mitos más comunes sobre el suplemento más estudiado...',
    image: '/imagenes/Creatina.jpg',
    author: 'Dra. Ana Pérez',
    date: '01 Nov, 2025',
    content: `
      <p>La creatina es, sin duda, el suplemento deportivo más investigado y validado del mercado. Sin embargo, todavía existen muchos mitos a su alrededor.</p>
      
      <h3>Mito 1: "Es mala para los riñones"</h3>
      <p><strong>FALSO.</strong> En individuos sanos, numerosos estudios a largo plazo no han demostrado ningún efecto adverso sobre la función renal. La confusión suele venir de un malentendido sobre los niveles de "creatinina", que es un subproducto normal.</p>
      
      <h3>Mito 2: "Es un esteroide"</h3>
      <p><strong>FALSO.</strong> La creatina es un compuesto orgánico natural que se encuentra en la carne y el pescado, y que tu propio cuerpo produce. No tiene nada que ver con las hormonas esteroideas.</p>
      
      <h3>Mito 3: "Hay que hacer 'fase de carga'"</h3>
      <p><strong>OPCIONAL.</strong> Una fase de carga (20g al día por 5-7 días) satura tus músculos más rápido. Sin embargo, tomar una dosis de mantenimiento (3-5g al día) logrará la misma saturación en unas 3-4 semanas. La carga no es necesaria, solo más rápida.</p>
    `
  },
];