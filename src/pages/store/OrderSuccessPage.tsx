import { useEffect } from 'react';
import { Container, Row, Col, Card, Alert, ListGroup, Image } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { NavBar } from '../../components/shared/NavBar';
import { Footer } from '../../components/shared/Footer';
import type { CartItem } from '../../interfaces/app.interfaces';

export const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Obtenemos la función para limpiar el carrito
  const { clearCart } = useCart();
  
  // 2. Obtenemos la orden que nos envió CheckoutPage
  const order = location.state?.order;

  useEffect(() => {
    // 3. SI HAY ORDEN, LIMPIAMOS EL CARRITO
    if (order) {
      console.log("Orden confirmada. Limpiando carrito...");
      clearCart();
    } else {
      // Si entran directo por URL sin comprar, al Home
      navigate('/');
    }
    // El array vacío asegura que esto corra solo una vez al montar la página
  }, []); 

  const handleGoHome = () => {
    navigate('/');
  };

  if (!order) return null;

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'var(--gym-dark-secondary)' }}>
      <NavBar />
      <main className="flex-grow-1">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={9} lg={8}>
              <Alert variant="success" className="text-center p-4">
                <i className="fa-solid fa-check-circle fa-3x mb-3 text-success"></i>
                <h1 className="h3">¡Gracias por tu compra!</h1>
                <p className="fs-5 mb-0">
                  Tu orden <strong>#{order.id}</strong> ha sido procesada exitosamente.
                </p>
              </Alert>
              
              <Card className="shadow-sm border-0 mt-4">
                <Card.Header as="h5" className="bg-white">Resumen</Card.Header>
                <Card.Body className="p-4">
                  <h5 className="text-primary">Productos</h5>
                  <ListGroup variant="flush" className="mb-3">
                    {order.items.map((item: CartItem) => (
                      <ListGroup.Item key={item.product.id} className="d-flex justify-content-between px-0">
                        <div>
                          <Image 
                            src={item.product.image} 
                            style={{ width: '40px' }} 
                            rounded 
                            className="me-2"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://source.unsplash.com/50x50/?gym'; }}
                          />
                          {item.product.name} (x{item.quantity})
                        </div>
                        <span className="fw-bold">
                          ${(item.product.price * item.quantity).toLocaleString('es-CL')}
                        </span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <div className="text-end border-top pt-3">
                    <h3 className="text-success fw-bold">
                      Total: ${order.total.toLocaleString('es-CL')}
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