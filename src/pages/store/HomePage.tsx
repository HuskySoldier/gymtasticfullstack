import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import { ProductCard } from '../../components/store/ProductCard';
import { getProducts } from '../../services/product.service';
import type { Product } from '../../interfaces/app.interfaces';

// Importar los nuevos estilos
import styles from './HomePage.module.css'; 

// Mapeo de categorías a imágenes (¡importante!)
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
    // ... (lógica de fetch sin cambios)
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
    // ... (lógica de renderizado sin cambios)
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
    <div className="min-vh-100"> 
      <NavBar />
      
      {/* --- NUEVO HERO BANNER --- */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            ELEVA TU <span className="text-primary">ENERGÍA</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Bienvenido a GYMTASTIC. Todo lo que necesitas para alcanzar tu máximo potencial.
          </p>
          {/* Usamos el nuevo botón con gradiente */}
          <button className="btn-primary-gradient" onClick={() => navigate('/categorias')}>
            Comprar Ahora
          </button>
        </div>
      </div>

      {/* --- NUEVA SECCIÓN DE CONFIANZA --- */}
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
        {/* --- SECCIÓN DE CATEGORÍAS MEJORADA --- */}
        <h2 className={styles.sectionTitle}>Comprar por Categoría</h2>
        <Row className="mb-4 mt-5">
          {categories.map(category => (
            <Col md={3} sm={6} key={category} className="mb-4">
              <div
                className={styles.categoryCard}
                onClick={() => navigate('/categorias')}
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

      {/* --- NUEVO FOOTER --- */}
      <footer className="site-footer">
        <Container>
          <Row>
            <Col md={3}>
              <h5 className="text-primary"><i className="fa-solid fa-bolt me-2"></i>GYMTASTIC</h5>
              <p>El siguiente nivel en equipamiento y suplementos.</p>
              <div className="social-icons">
                <a href="#"><i className="fa-brands fa-facebook"></i></a>
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                <a href="#"><i className="fa-brands fa-twitter"></i></a>
              </div>
            </Col>
            <Col md={3}>
              <h5>Navegación</h5>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/categorias">Categorías</a></li>
                <li><a href="/ofertas">Ofertas</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Ayuda</h5>
              <ul className="footer-links">
                <li><a href="#">Soporte</a></li>
                <li><a href="#">Envíos y Devoluciones</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Contacto</h5>
              <ul className="footer-links">
                <li><p className="mb-1">Av. Siempre Viva 123</p></li>
                <li><p className="mb-1">contacto@gymtastic.com</p></li>
                <li><p>+56 9 1234 5678</p></li>
              </ul>
            </Col>
          </Row>
          <hr className="mt-4" style={{ borderColor: 'var(--gym-text-secondary)' }} />
          <p className="text-center text-secondary mt-4 mb-0">
            &copy; {new Date().getFullYear()} GYMTASTIC. Todos los derechos reservados.
          </p>
        </Container>
      </footer>
    </div>
  );
};