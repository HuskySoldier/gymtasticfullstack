import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Button, Card, ListGroup, Image, Container } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
// --- ¡CAMBIOS EN IMPORTS! ---
import type { CartItem, CustomerDetails } from '../../interfaces/app.interfaces';
import { createOrder } from '../../services/order.service'; // <--- 1. Importar el servicio
import { NavBar } from '../../components/shared/NavBar';
import { Footer } from '../../components/shared/Footer';

// Esta es la interfaz que usará la página de "Pago Fallido"
interface FailedOrderDetails {
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
}

export const CheckoutPage = () => {
  const { cart, getTotalPrice } = useCart(); // Ya no necesitamos clearCart aquí
  const navigate = useNavigate();
  const location = useLocation(); 

  // Estados del formulario
  const [nombre, setNombre] = useState('pedro');
  const [apellidos, setApellidos] = useState('hacker');
  const [correo, setCorreo] = useState('pedro.hacker20@example.com');
  const [calle, setCalle] = useState('Los crisantemos, Edificio Norte');
  const [depto, setDepto] = useState('Depto 603');
  const [region, setRegion] = useState('Región Metropolitana de Santiago');
  const [comuna, setComuna] = useState('Cerrillos');

  // Lógica de pre-carga (si venimos de un pago fallido)
  useEffect(() => {
    if (location.state?.order) {
      const order = location.state.order as FailedOrderDetails;
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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // --- 2. PREPARAR DATOS DEL CLIENTE ---
    const customerDetails: CustomerDetails = { 
      nombre, apellidos, correo, calle, depto, region, comuna 
    };
    const total = getTotalPrice();
    
    // Simulación de pago
    console.log('Procesando pago...');
    const pagoExitoso = Math.random() > 0.5; // Simula 50% de chance de éxito

    if (pagoExitoso) {
      try {
        // --- 3. CREAR LA ORDEN EN EL SERVICIO ---
        const newOrder = await createOrder(customerDetails, cart, total);
        
        // --- 4. NAVEGAR A ÉXITO CON EL ID REAL ---
        navigate(`/compra-exitosa/${newOrder.id}`, {
          replace: true, // Reemplaza el historial
        });
      } catch (err) {
        console.error("Error al crear la orden:", err);
        // Manejar el error si el servicio falla
      }
    } else {
      // --- 5. NAVEGAR A ERROR (con datos) ---
      const orderDetails: FailedOrderDetails = {
        customer: customerDetails,
        items: cart,
        total: total
      };
      const simulatedOrderId = `ORD-FAIL-${Date.now()}`;
      
      navigate('/compra-fallida', {
        replace: true,
        state: { order: orderDetails, orderId: simulatedOrderId }
      });
    }
  };

  if (cart.length === 0 && !location.state?.order) {
    navigate('/');
    return null;
  }
  
  const itemsToShow = location.state?.order?.items || cart;
  const totalToShow = location.state?.order?.total || getTotalPrice();

  return (
    // --- 6. APLICAR ESTÉTICA PROFESIONAL ---
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />
      <main className="flex-grow-1" style={{ backgroundColor: '#f8f9fa' }}>
        <Container className="py-5">
          <h1 className="mb-4 text-dark">Información de Pago y Envío</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Columna Izquierda: Resumen y Formulario */}
              <Col md={7}>
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Header as="h5" className="bg-white">Resumen de tu compra</Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {itemsToShow.map((item: CartItem) => (
                        <ListGroup.Item key={item.product.id} className="d-flex justify-content-between align-items-center">
                          <Image src={item.product.image} alt={item.product.name} style={{ width: '50px' }} rounded />
                          <span>{item.product.name} (x{item.quantity})</span>
                          <span className="fw-bold">${(item.product.price * item.quantity).toLocaleString('es-CL')}</span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>

                <h3 className="mb-3 text-dark">Información del cliente</h3>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formNombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
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
                  />
                </Form.Group>

                <h3 className="mb-3 mt-4 text-dark">Dirección de entrega</h3>
                <Form.Group className="mb-3" controlId="formCalle">
                  <Form.Label>Calle</Form.Label>
                  <Form.Control
                    type="text"
                    value={calle}
                    onChange={(e) => setCalle(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDepto">
                  <Form.Label>Departamento (opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    value={depto}
                    onChange={(e) => setDepto(e.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formRegion">
                      <Form.Label>Región</Form.Label>
                      <Form.Select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
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
                <Card className="border-0 shadow-sm sticky-top" style={{ top: '100px' }}>
                  <Card.Body>
                    <Card.Title className="fs-3 mb-3">Total a Pagar</Card.Title>
                    <h2 className="text-success fw-bold mb-4">
                      ${totalToShow.toLocaleString('es-CL')}
                    </h2>
                    <div className="d-grid">
                      {/* Usamos el botón de gradiente profesional */}
                      <button className="btn-primary-gradient" type="submit">
                        Pagar Ahora
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </Container>
      </main>
      <Footer />
    </div>
  );
};