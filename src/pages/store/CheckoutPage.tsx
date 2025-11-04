import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- CORRECCIÓN AQUÍ
import { Row, Col, Form, Button, Card, ListGroup, Image } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';

/**
 * Esta es la página de Checkout, basada en la Figura 6 del PDF.
 */
export const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // Estados para el formulario (simplificado)
  const [nombre, setNombre] = useState('pedro');
  const [apellidos, setApellidos] = useState('hacker');
  const [correo, setCorreo] = useState('pedro.hacker20@example.com');
  const [calle, setCalle] = useState('Los crisantemos, Edificio Norte');
  const [depto, setDepto] = useState('Depto 603');
  const [region, setRegion] = useState('Región Metropolitana de Santiago');
  const [comuna, setComuna] = useState('Cerrillos');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Aquí iría la lógica de procesar el pago (ej. conectar con una API)
    // Como es un mock, simularemos un pago exitoso
    console.log('Procesando pago...');
    
    // Limpiamos el carrito
    clearCart();

    // Redirigimos a la página de éxito (Paso siguiente)
    // Usamos un ID de orden simulado
    navigate('/compra-exitosa/20240705');
  };

  if (cart.length === 0) {
    // Si el carrito está vacío, no debería estar aquí
    navigate('/');
    return null;
  }

  return (
    <div className="text-white">
      <h1 className="mb-4">Información de Pago y Envío</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Columna Izquierda: Resumen de compra y Formulario */}
          <Col md={7}>
            {/* Resumen de Compra (basado en Figura 6) */}
            <Card bg="dark" text="white" className="border-secondary mb-4">
              <Card.Header as="h5">Resumen de tu compra</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {cart.map(item => (
                    <ListGroup.Item key={item.product.id} className="bg-dark text-white d-flex justify-content-between align-items-center">
                      <Image src={item.product.imageUrl} alt={item.product.name} style={{ width: '50px' }} rounded />
                      <span>{item.product.name} (x{item.quantity})</span>
                      <span className="fw-bold">${(item.product.price * item.quantity).toLocaleString('es-CL')}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            {/* Información del Cliente */}
            <h3 className="mb-3">Información del cliente</h3>
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
            <h3 className="mb-3 mt-4">Dirección de entrega</h3>
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
                  ${getTotalPrice().toLocaleString('es-CL')}
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
    </div>
  );
};