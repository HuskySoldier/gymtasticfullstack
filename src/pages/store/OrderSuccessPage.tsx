import { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, ListGroup, Image } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { NavBar } from '../../components/shared/NavBar';

export const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  // Obtenemos los detalles de la orden pasados por 'state'
  const order = location.state?.order;

  // Efecto para limpiar el carrito una vez que llegamos a esta página
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const handleGoHome = () => {
    navigate('/');
  };

  if (!order) {
    // Si no hay 'order' en el 'state', es que el usuario recargó la página o llegó aquí por error
    return (
      <div className="bg-dark text-white min-vh-100">
        <NavBar />
        <Container className="text-center py-5">
          <Alert variant="warning">
            <Alert.Heading>¡Ups!</Alert.Heading>
            <p>No podemos mostrar los detalles de esta orden. Es posible que hayas recargado la página.</p>
            <Button variant="primary" onClick={handleGoHome}>Volver al Inicio</Button>
          </Alert>
        </Container>
      </div>
    );
  }

  // Si tenemos la orden, la mostramos (Figura 7)
  return (
    <div className="bg-dark text-white min-vh-100">
      <NavBar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Alert variant="success">
              <Alert.Heading className="text-center">
                <i className="fa-solid fa-check-circle fa-2x mb-3"></i>
                <br />
                ¡Se ha realizado la compra!
              </Alert.Heading>
              <p className="text-center fs-5">Número de orden: <strong>#{orderId}</strong></p>
            </Alert>
            
            <Card bg="dark" text="white" className="border-secondary mt-4">
              <Card.Header as="h5">Resumen de la Compra</Card.Header>
              <Card.Body>
                {/* Datos del Cliente */}
                <h5 className="text-primary">Datos del Cliente</h5>
                <p className="mb-1"><strong>Nombre:</strong> {order.customer.nombre} {order.customer.apellidos}</p>
                <p className="mb-1"><strong>Correo:</strong> {order.customer.correo}</p>
                
                <hr className="border-secondary" />
                
                {/* Dirección de Entrega */}
                <h5 className="text-primary">Dirección de Entrega</h5>
                <p className="mb-1">{order.customer.calle}, {order.customer.depto}</p>
                <p>{order.customer.comuna}, {order.customer.region}</p>

                <hr className="border-secondary" />

                {/* Items Comprados */}
                <h5 className="text-primary">Productos</h5>
                <ListGroup variant="flush" className="mb-3">
                  {order.items.map((item: any) => (
                    <ListGroup.Item key={item.product.id} className="bg-dark text-white d-flex justify-content-between">
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
                  <h3 className="text-success">
                    Total Pagado: ${order.total.toLocaleString('es-CL')}
                  </h3>
                </div>

                <div className="text-center mt-4 d-grid">
                  <Button variant="primary" size="lg" onClick={handleGoHome}>
                    Volver a la tienda
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};