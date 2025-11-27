import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Breadcrumb } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import { ProductCard } from '../../components/store/ProductCard';
import { getProductsByCategory } from '../../services/product.service';
import type { Product } from '../../interfaces/app.interfaces';
import styles from './ProductListPage.module.css';

export const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const params = useParams(); 
  
  const categoryName = decodeURIComponent(params.categoryName || '');

  useEffect(() => {
    if (!categoryName) {
      navigate('/');
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProductsByCategory(categoryName);
        if (response.ok) {
          setProducts(response.products);
        } else {
          setError('Error al cargar los productos de esta categoría.');
        }
      } catch (err) {
        // --- CORRECCIÓN AQUÍ ---
        // Usamos 'err' para imprimirlo en consola y evitar el error de variable no usada
        console.error("Error fetching products:", err);
        setError('Error de conexión.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryName, navigate]);

  const renderContent = () => {
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
    if (products.length === 0) {
      return (
        <Alert variant="info" className="text-center">
          No hay productos disponibles en esta categoría por el momento.
        </Alert>
      );
    }
    return (
      <Row>
        {products.map((product) => (
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
      
      <div className={styles.titleBanner}>
        <h1 className={styles.title}>{categoryName || 'Categoría'}</h1>
      </div>

      <Container className="py-4">
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/categorias" }}>Categorías</Breadcrumb.Item>
          <Breadcrumb.Item active>{categoryName}</Breadcrumb.Item>
        </Breadcrumb>
      
        {renderContent()}
      </Container>
    </div>
  );
};