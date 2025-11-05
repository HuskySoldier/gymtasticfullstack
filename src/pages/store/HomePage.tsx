import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import { ProductCard } from '../../components/store/ProductCard';
import { getProducts } from '../../services/product.service';
import type { Product } from '../../interfaces/app.interfaces';
import styles from './HomePage.module.css'; 
import { Footer } from '../../components/shared/Footer';


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
    <div className="min-vh-100 d-flex flex-column"> 
      <NavBar />
      
      <main className="flex-grow-1">
        
        {/* --- HERO BANNER (Ahora más brillante) --- */}
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

        {/* --- SECCIÓN DE CONFIANZA (Ahora oscura) --- */}
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
        
        {/* --- SECCIÓN DE CATEGORÍAS (Fondo blanco por defecto) --- */}
        <Container className="py-5">
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
        </Container>

        {/* --- NUEVA SECCIÓN PROMO (Oscura) --- */}
        <Container fluid className={styles.promoSection}>
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="mb-4 mb-md-0">
                <div className={styles.promoContent}>
                  <h2 className={styles.promoTitle}>
                    EQUIPAMIENTO PROFESIONAL
                  </h2>
                  <p className={styles.promoText}>
                    Desde mancuernas hasta máquinas completas. Lleva tu entrenamiento en casa al siguiente nivel.
                  </p>
                  <div className="mt-2">
                    <button 
                      className="btn-primary-gradient" 
                      onClick={() => navigate('/categoria/Equipamiento')}
                    >
                      Ver Equipamiento
                    </button>
                  </div>
                </div>
              </Col>
              <Col md={6}>
              {/* 2. Reemplaza el 'div' vacío por esto: */}
              <div className={styles.promoImage}>
                <Image 
                  src="/imagenes/PesaRusa.png" // <-- 3. Pon la ruta a tu imagen local
                  alt="Equipamiento profesional" 
                  className={styles.promoImageInner} // <-- 4. Usa la nueva clase
                />
              </div>
            </Col>
            </Row>
          </Container>
        </Container>

        {/* --- SECCIÓN DE PRODUCTOS DESTACADOS (Fondo gris claro) --- */}
        <div className={styles.featuredSection}>
          <Container>
            <h2 className={styles.featuredTitle}>Productos Destacados</h2>
            <Row className="mt-5">
              {renderProducts()}
            </Row>
          </Container>
        </div>

      </main>

      <Footer />
    </div>
  );
};