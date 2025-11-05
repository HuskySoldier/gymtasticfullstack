import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, ListGroup, Image, Spinner } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { NavBar } from '../../components/shared/NavBar';
import { Footer } from '../../components/shared/Footer';
import { getOrderById } from '../../services/order.service'; // Removed non-exported 'Order' type
import type { CartItem } from '../../interfaces/app.interfaces';

export const OrderSuccessPage = () => {
  const { orderId } = useParams(); // Lee el ID de la URL
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  // Estado para guardar la orden
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Efecto para limpiar el carrito una vez
  useEffect(() => {
    console.log('Compra exitosa, limpiando carrito...');
    clearCart();
  }, [clearCart]);

  // Efecto para cargar los datos de la orden
  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }
    
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const fetchedOrder = await getOrderById(orderId);
        if (fetchedOrder) {
          setOrder(fetchedOrder);
        } else {
          // Si la orden no se encuentra, es un error
          navigate('/');
        }
      } catch (err) {
        console.error("Error al cargar la orden:", err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId, navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <NavBar />
        <Container className="text-center py-5 flex-grow-1">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Cargando confirmación de tu orden...</p>
        </Container>
        <Footer />
      </div>
    );
  }

  if (!order) {
    // Esto no debería pasar si la lógica es correcta, pero es un buen fallback
    return (
      <div className="min-vh-100 d-flex flex-column">
        <NavBar />
        <Container className="text-center py-5 flex-grow-1">
          <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>No se pudo encontrar tu orden.</p>
            <Button variant="primary" onClick={handleGoHome}>Volver al Inicio</Button>
          </Alert>
        </Container>
        <Footer />
      </div>
    );
  }

  // Si tenemos la orden, la mostramos (Figura 7)
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f8f9fa' }}>
      <NavBar />
      <main className="flex-grow-1">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={9} lg={8}>
              <Alert variant="success" className="text-center p-4">
                <i className="fa-solid fa-check-circle fa-3x mb-3 text-success"></i>
                <h1 className="h3">¡Se ha realizado la compra!</h1>
                <p className="fs-5 mb-0">
                  Número de orden: <strong>#{order.id}</strong>
                </p>
              </Alert>
              
              <Card className="shadow-sm border-0 mt-4">
                <Card.Header as="h5" className="bg-white">Resumen de la Compra</Card.Header>
                <Card.Body className="p-4">
                  {/* Datos del Cliente */}
                  <h5 className="text-primary">Datos del Cliente</h5>
                  <p className="mb-1"><strong>Nombre:</strong> {order.customer.nombre} {order.customer.apellidos}</p>
                  <p className="mb-1"><strong>Correo:</strong> {order.customer.correo}</p>
                  
                  <hr className="my-3" />
                  
                  {/* Dirección de Entrega */}
                  <h5 className="text-primary">Dirección de Entrega</h5>
                  <p className="mb-1">{order.customer.calle}, {order.customer.depto}</p>
                  <p className="text-secondary">{order.customer.comuna}, {order.customer.region}</p>

                  <hr className="my-3" />

                  {/* Items Comprados */}
                  <h5 className="text-primary">Productos</h5>
                  <ListGroup variant="flush" className="mb-3">
                    {order.items.map((item: CartItem) => (
                      <ListGroup.Item key={item.product.id} className="d-flex justify-content-between px-0">
                        <div>
                          <Image src={item.product.image} style={{ width: '40px' }} rounded className="me-2" />
                          {item.product.name} (x{item.quantity})
                        </div>
                        <span className="fw-bold">
                          ${(item.product.price * item.quantity).toLocaleString('es-CL')}
                        </span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  {/* Total */}
                  <div className="text-end">
                    <h3 className="text-success fw-bold">
                      Total Pagado: ${order.total.toLocaleString('es-CL')}
                    </h3>
                  </div>

                  <div className="text-center mt-4 d-grid">
                    <button className="btn-primary-gradient" onClick={handleGoHome}>
                      Volver a la tienda
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
};