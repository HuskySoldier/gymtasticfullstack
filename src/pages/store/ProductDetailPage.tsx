import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Asegúrate de importar Link si usas Breadcrumb
import { Container, Row, Col, Image, Button, Spinner, Alert, Breadcrumb } from 'react-bootstrap';
import { getProductById } from '../../services/product.service';
import type { Product } from '../../interfaces/app.interfaces';
import { useCart } from '../../context/CartContext';
import { NavBar } from '../../components/shared/NavBar';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        setError('ID de producto inválido.');
        setLoading(false);
        return;
      }

      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await getProductById(numericId);
          if (response.ok && response.product) {
            setProduct(response.product);
          } else {
            setError('Producto no encontrado.');
          }
        } catch (err) {
          // --- CORRECCIÓN: Uso de la variable err ---
          console.error("Error cargando producto:", err);
          setError('Error de conexión al cargar el producto.');
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      navigate('/carrito');
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center text-white mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Cargando producto...</p>
        </div>
      );
    }

    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }

    if (!product) {
      return <Alert variant="warning">No se ha podido cargar el producto.</Alert>;
    }

    return (
      <Row className="p-4 rounded" style={{ 
        backgroundColor: 'rgba(33, 37, 41, 0.8)',
        backdropFilter: 'blur(10px)',
      }}>
        <Col md={6}>
          {/* Manejo de error de imagen (fallback) */}
          <Image 
            src={product.image} 
            alt={product.name} 
            fluid 
            rounded 
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://source.unsplash.com/400x400/?gym'; }}
          />
        </Col>
        <Col md={6}>
          <h1 className="display-4 fw-bold text-primary">{product.name}</h1>
          <p className="fs-5 text-muted">{product.category}</p>
          <hr className="border-secondary" />
          
          <h3 className="text-success fw-bold my-3">
            ${product.price.toLocaleString('es-CL')}
          </h3>
          
          <p className="fs-5">{product.description}</p>
          
          <div className="d-grid gap-2 mt-4">
            <Button 
              variant="success" 
              size="lg" 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <i className="fa-solid fa-cart-plus me-2"></i>
              {product.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
            </Button>
            <Button 
              variant="outline-light" 
              onClick={() => navigate(-1)}
            >
              <i className="fa-solid fa-arrow-left me-2"></i>
              Volver
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      <NavBar />
      <Container className="py-5">
        {/* Se agregó Link en Breadcrumb para evitar recargas completas */}
        <Breadcrumb listProps={{ className: 'breadcrumb-dark' }}>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{product?.name || 'Producto'}</Breadcrumb.Item>
        </Breadcrumb>
        {renderContent()}
      </Container>
    </div>
  );
};