import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import { getProducts } from '../../services/product.service'; // Asegúrate que la ruta sea correcta
import styles from './CategoriesPage.module.css';

// Mapeo de categorías a imágenes (¡importante!)
const categoryImages: { [key: string]: string } = {
  'Membresías': 'https://source.unsplash.com/600x500/?gym,contract',
  'Suplementos': 'https://source.unsplash.com/600x500/?supplements,fitness',
  'Ropa': 'https://source.unsplash.com/600x500/?gym,apparel',
  'Equipamiento': 'https://source.unsplash.com/600x500/?gym,equipment'
};

export const CategoriesPage = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Obtenemos productos para sacar las categorías únicas
        const response = await getProducts();
        if (response.ok) {
          const uniqueCategories = [...new Set(response.products.map(p => p.category))];
          setCategories(uniqueCategories);
        } else {
          setError('Error al cargar las categorías.');
        }
      } catch (err) {
        // --- CORRECCIÓN: Usamos la variable err ---
        console.error("Error al obtener categorías:", err);
        setError('Error de conexión.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    // Usamos encodeURIComponent para manejar espacios o tildes (ej: "Membresías")
    navigate(`/categoria/${encodeURIComponent(categoryName)}`);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }
    return (
      <Row>
        {categories.map(category => (
          <Col md={6} key={category} className="mb-4">
            <div
              className={styles.categoryCard}
              onClick={() => handleCategoryClick(category)}
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
    );
  };

  return (
    <div className="min-vh-100">
      <NavBar />
      
      {/* Encabezado de la página */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Categorías</h1>
        <p className={styles.pageSubtitle}>Encuentra lo que necesitas para tu entrenamiento.</p>
      </div>

      <Container className="py-4">
        {renderContent()}
      </Container>
      
      {/* Puedes reusar el footer aquí si lo tienes en un componente separado */}
    </div>
  );
};