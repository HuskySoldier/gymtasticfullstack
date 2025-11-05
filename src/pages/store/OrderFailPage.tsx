import { Container, Row, Col, Card, Button, Alert, ListGroup, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';

export const OrderFailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const order = location.state?.order;
  const orderId = location.state?.orderId;

  const handleTryAgain = () => {
    // Volvemos al checkout, pasando los datos de la orden para pre-rellenar el formulario
    navigate('/checkout', { state: { order } });
  };
  
  const handleGoHome = () => {
    navigate('/');
  };

  if (!order) {
    // Si no hay 'order' en el 'state', redirigir
    return (
      <div className="bg-dark text-white min-vh-100">
        <NavBar />
        <Container className="text-center py-5">
          <Alert variant="danger">
            <Alert.Heading>Error de Pago</Alert.Heading>
            <p>No se pudo procesar el pago.</p>
            <Button variant="primary" onClick={handleGoHome}>Volver al Inicio</Button>
          </Alert>
        </Container>
      </div>
    );
  }

  // Si tenemos la orden, la mostramos (Figura 8)
  return (
    <div className="bg-dark text-white min-vh-100">
      <NavBar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Alert variant="danger">
              <Alert.Heading className="text-center">
                <i className="fa-solid fa-times-circle fa-2x mb-3"></i>
                <br />
                No se pudo realizar el pago
              </Alert.Heading>
              <p className="text-center fs-5">Número de orden: <strong>#{orderId}</strong></p>
            </Alert>
            
            <div className="d-grid gap-2 my-4">
              <Button variant="success" size="lg" onClick={handleTryAgain}>
                <i className="fa-solid fa-redo me-2"></i>
                VOLVER A REALIZAR EL PAGO
              </Button>
            </div>

            <Card bg="dark" text="white" className="border-secondary mt-4">
              <Card.Header as="h5">Detalle de la Compra</Card.Header>
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
                  <h3 className="text-white">
                    Total a Pagar: ${order.total.toLocaleString('es-CL')}
                  </h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};