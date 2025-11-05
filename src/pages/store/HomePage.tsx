import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import { ProductCard } from '../../components/store/ProductCard';
import { getProducts } from '../../services/product.service'; // Asegúrate que la ruta sea correcta
import type { Product } from '../../interfaces/app.interfaces';
import styles from './HomePage.module.css'; 
import { Footer } from '../../components/shared/Footer'; // <--- 1. IMPORTA EL FOOTER

// ... (Mapeo de categoryImages y el resto del componente sin cambios)
const categoryImages: { [key: string]: string } = {
  'Membresías': 'https://source.unsplash.com/600x500/?gym,contract',
  'Suplementos': 'https://source.unsplash.com/600x500/?supplements,fitness',
  'Ropa': 'https://source.unsplash.com/600x500/?gym,apparel',
  'Equipamiento': 'https://source.unsplash.com/600x500/?gym,equipment'
};

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = [...new Set(products.map(p => p.category))];

  useEffect(() => {
    // ... (fetchData sin cambios)
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        if (response.ok) {
          setProducts(response.products);
        } else {
          setError('Error al cargar los productos.');
        }
      } catch (err) {
        setError('Error de conexión al cargar productos.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderProducts = () => {
    // ... (renderProducts sin cambios)
    if (loading) {
      return (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Cargando productos...</p>
        </div>
      );
    }
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }
    return (
      <Row>
        {products.slice(0, 4).map((product) => (
          <Col key={product.id} xl={3} lg={4} md={6} sm={12} className="mb-4 mt-2">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    // <--- 2. AÑADIMOS CLASES DE FLEXBOX PARA EL FOOTER ---
    <div className="min-vh-100 d-flex flex-column"> 
      <NavBar />
      
      {/* --- 3. CONTENIDO PRINCIPAL --- */}
      <main className="flex-grow-1">
        {/* --- HERO BANNER --- */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              ELEVA TU <span className="text-primary">ENERGÍA</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Bienvenido a GYMTASTIC. Todo lo que necesitas para alcanzar tu máximo potencial.
            </p>
            <button className="btn-primary-gradient" onClick={() => navigate('/categorias')}>
              Comprar Ahora
            </button>
          </div>
        </div>

        {/* --- SECCIÓN DE CONFIANZA --- */}
        <Container fluid className={styles.trustSection}>
          <Container>
            <Row>
              <Col md={4} className={styles.trustItem}>
                <i className={`fa-solid fa-award ${styles.trustIcon}`}></i>
                <h3 className={styles.trustTitle}>Calidad Premium</h3>
                <p className={styles.trustText}>Solo trabajamos con las mejores marcas y materiales.</p>
              </Col>
              <Col md={4} className={styles.trustItem}>
                <i className={`fa-solid fa-truck-fast ${styles.trustIcon}`}></i>
                <h3 className={styles.trustTitle}>Envío Rápido</h3>
                <p className={styles.trustText}>Recibe tus productos en tiempo récord donde estés.</p>
              </Col>
              <Col md={4} className={styles.trustItem}>
                <i className={`fa-solid fa-headset ${styles.trustIcon}`}></i>
                <h3 className={styles.trustTitle}>Soporte Experto</h3>
                <p className={styles.trustText}>Nuestro equipo está listo para asesorarte 24/7.</p>
              </Col>
            </Row>
          </Container>
        </Container>
        
        <Container className="py-5">
          {/* --- SECCIÓN DE CATEGORÍAS --- */}
          <h2 className={styles.sectionTitle}>Comprar por Categoría</h2>
          <Row className="mb-4 mt-5">
            {categories.map(category => (
              <Col md={3} sm={6} key={category} className="mb-4">
                <div
                  className={styles.categoryCard}
                  onClick={() => navigate(`/categoria/${encodeURIComponent(category)}`)}
                >
                  <div 
                    className={styles.categoryCardImage}
                    style={{ backgroundImage: `url(${categoryImages[category] || 'https://source.unsplash.com/600x500/?abstract'})` }}
                  >
                    <div className={styles.categoryOverlay}>
                      <h3 className={styles.categoryTitle}>{category}</h3>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          
          {/* --- SECCIÓN DE PRODUCTOS DESTACADOS --- */}
          <h2 className={`${styles.sectionTitle} mt-5`}>Productos Destacados</h2>
          <Row className="mt-5">
            {renderProducts()}
          </Row>
        </Container>
      </main>

      {/* --- 4. USA EL COMPONENTE FOOTER --- */}
      <Footer />
    </div>
  );
};