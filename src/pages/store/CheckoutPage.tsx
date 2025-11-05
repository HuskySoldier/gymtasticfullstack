import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // <--- 1. AÑADIR useLocation
import { Row, Col, Form, Button, Card, ListGroup, Image, Container } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import type { CartItem } from '../../interfaces/app.interfaces'; // <--- 2. IMPORTAR CartItem

// Interfaz para los detalles de la orden
interface OrderDetails {
  customer: {
    nombre: string;
    apellidos: string;
    correo: string;
    calle: string;
    depto: string;
    region: string;
    comuna: string;
  };
  items: CartItem[];
  total: number;
}


export const CheckoutPage = () => {
  const { cart, getTotalPrice } = useCart(); // <--- 3. QUITAR clearCart
  const navigate = useNavigate();
  const location = useLocation(); // <--- 4. AÑADIR hook

  // Estados para el formulario
  const [nombre, setNombre] = useState('pedro');
  const [apellidos, setApellidos] = useState('hacker');
  const [correo, setCorreo] = useState('pedro.hacker20@example.com');
  const [calle, setCalle] = useState('Los crisantemos, Edificio Norte');
  const [depto, setDepto] = useState('Depto 603');
  const [region, setRegion] = useState('Región Metropolitana de Santiago');
  const [comuna, setComuna] = useState('Cerrillos');

  // --- 5. LÓGICA DE PRE-CARGA ---
  // Si volvemos de la página de error, precargamos los datos
  useEffect(() => {
    if (location.state?.order) {
      const order = location.state.order as OrderDetails;
      const { customer } = order;
      setNombre(customer.nombre);
      setApellidos(customer.apellidos);
      setCorreo(customer.correo);
      setCalle(customer.calle);
      setDepto(customer.depto);
      setRegion(customer.region);
      setComuna(customer.comuna);
    }
  }, [location.state]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // --- 6. PREPARAR DATOS DE LA ORDEN ---
    const orderDetails: OrderDetails = {
      customer: { nombre, apellidos, correo, calle, depto, region, comuna },
      items: cart,
      total: getTotalPrice()
    };
    
    // Simulación de pago
    console.log('Procesando pago...');
    const pagoExitoso = Math.random() > 0.5; // Simula 50% de chance de éxito
    const orderId = "20240705"; // ID simulado

    if (pagoExitoso) {
      // --- 7. NAVEGAR A ÉXITO (con datos) ---
      navigate(`/compra-exitosa/${orderId}`, {
        replace: true, // Reemplaza el historial para no volver al checkout
        state: { order: orderDetails }
      });
    } else {
      // --- 8. NAVEGAR A ERROR (con datos) ---
      navigate('/compra-fallida', {
        replace: true,
        state: { order: orderDetails, orderId: orderId }
      });
    }
  };

  if (cart.length === 0 && !location.state?.order) {
    // Si el carrito está vacío Y no venimos de un reintento, redirigir
    navigate('/');
    return null;
  }
  
  // Usamos 'cart' o 'location.state.order.items' si venimos de un reintento
  const itemsToShow = location.state?.order?.items || cart;

  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <Container>
        <h1 className="mb-4 text-white">Información de Pago y Envío</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Columna Izquierda: Resumen de compra y Formulario */}
            <Col md={7}>
              {/* Resumen de Compra (basado en Figura 6) */}
              <Card bg="dark" text="white" className="border-secondary mb-4">
                <Card.Header as="h5">Resumen de tu compra</Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {itemsToShow.map((item: CartItem) => (
                      <ListGroup.Item key={item.product.id} className="bg-dark text-white d-flex justify-content-between align-items-center">
                        <Image src={item.product.image} alt={item.product.name} style={{ width: '50px' }} rounded />
                        <span>{item.product.name} (x{item.quantity})</span>
                        <span className="fw-bold">${(item.product.price * item.quantity).toLocaleString('es-CL')}</span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>

              {/* Información del Cliente */}
              <h3 className="mb-3 text-white">Información del cliente</h3>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      className="bg-dark text-white border-secondary"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formApellidos">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      type="text"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      required
                      className="bg-dark text-white border-secondary"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formCorreo">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              {/* Dirección de Entrega */}
              <h3 className="mb-3 mt-4 text-white">Dirección de entrega</h3>
              <Form.Group className="mb-3" controlId="formCalle">
                <Form.Label>Calle</Form.Label>
                <Form.Control
                  type="text"
                  value={calle}
                  onChange={(e) => setCalle(e.target.value)}
                  required
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDepto">
                <Form.Label>Departamento (opcional)</Form.Label>
                <Form.Control
                  type="text"
                  value={depto}
                  onChange={(e) => setDepto(e.target.value)}
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formRegion">
                    <Form.Label>Región</Form.Label>
                    <Form.Select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="bg-dark text-white border-secondary"
                    >
                      <option>Región Metropolitana de Santiago</option>
                      <option>Valparaíso</option>
                      <option>Biobío</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formComuna">
                    <Form.Label>Comuna</Form.Label>
                    <Form.Select
                      value={comuna}
                      onChange={(e) => setComuna(e.target.value)}
                      className="bg-dark text-white border-secondary"
                    >
                      <option>Cerrillos</option>
                      <option>Maipú</option>
                      <option>Pudahuel</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Col>

            {/* Columna Derecha: Total y Botón de Pago */}
            <Col md={5}>
              <Card bg="dark" text="white" className="border-secondary sticky-top" style={{ top: '100px' }}>
                <Card.Body>
                  <Card.Title className="fs-3 mb-3">Total a Pagar</Card.Title>
                  <h2 className="text-success fw-bold mb-4">
                    ${(location.state?.order?.total || getTotalPrice()).toLocaleString('es-CL')}
                  </h2>
                  <div className="d-grid">
                    <Button variant="success" size="lg" type="submit">
                      Pagar Ahora
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};