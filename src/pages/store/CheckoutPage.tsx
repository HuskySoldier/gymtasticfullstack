import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Card, ListGroup, Image, Container } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import type { CartItem, CustomerDetails } from '../../interfaces/app.interfaces';
import { createOrder } from '../../services/order.service';
import { NavBar } from '../../components/shared/NavBar';
import { Footer } from '../../components/shared/Footer';
import { useAuth } from '../../context/AuthContext';
import { getRegions, getCommunesByRegion } from '../../services/location.service';

// --- 1. REUTILIZAMOS LOS ESTILOS DE FORMULARIO OSCURO ---
import styles from './RegisterPage.module.css'; 

interface FailedOrderDetails {
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
}

export const CheckoutPage = () => {
  const { cart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const location = useLocation(); 

  const { user } = useAuth();
  const failedOrderCustomer = (location.state?.order as FailedOrderDetails)?.customer;

  // Estados para los datos del formulario (Nombre, Apellido, Correo)
  const userNameParts = user?.name.split(' ') || [];
  const userFirstName = userNameParts[0] || '';
  const userLastName = userNameParts.slice(1).join(' ') || '';

  const [nombre, setNombre] = useState(failedOrderCustomer?.nombre || userFirstName);
  const [apellidos, setApellidos] = useState(failedOrderCustomer?.apellidos || userLastName);
  const [correo, setCorreo] = useState(failedOrderCustomer?.correo || user?.email || '');
  
  const [regions, setRegions] = useState<string[]>([]);
  const [communes, setCommunes] = useState<string[]>([]);

  const [region, setRegion] = useState(failedOrderCustomer?.region || 'Región Metropolitana de Santiago');
  const [comuna, setComuna] = useState(failedOrderCustomer?.comuna || 'Cerrillos');

  const [calle, setCalle] = useState(failedOrderCustomer?.calle || '');
  const [depto, setDepto] = useState(failedOrderCustomer?.depto || '');
  
  useEffect(() => {
    getRegions().then(regionNames => {
      setRegions(regionNames);
    });
  }, []); 

  useEffect(() => {
    if (region) {
      getCommunesByRegion(region).then(communeNames => {
        setCommunes(communeNames);
        if (!communeNames.includes(comuna)) {
          setComuna(communeNames[0] || '');
        }
      });
    }
  }, [region, comuna]); // <-- Añadido 'comuna' para corregir un bug de selección


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // ... (La lógica de handleSubmit no cambia) ...
    e.preventDefault();
    const customerDetails: CustomerDetails = { 
      nombre, apellidos, correo, calle, depto, region, comuna 
    };
    const total = getTotalPrice();
    console.log('Procesando pago...');
    const pagoExitoso = Math.random() > 0.5; 
    if (pagoExitoso) {
      try {
        const newOrder = await createOrder(customerDetails, cart, total);
        navigate(`/compra-exitosa/${newOrder.id}`, { replace: true });
      } catch (err) {
        console.error("Error al crear la orden:", err);
      }
    } else {
      const orderDetails: FailedOrderDetails = {
        customer: customerDetails, items: cart, total: total
      };
      const simulatedOrderId = `ORD-FAIL-${Date.now()}`;
      navigate('/compra-fallida', {
        replace: true, state: { order: orderDetails, orderId: simulatedOrderId }
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
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />
      {/* --- 2. FONDO GRIS OSCURO --- */}
      <main className="flex-grow-1" style={{ backgroundColor: 'var(--gym-dark-secondary)' }}>
        <Container className="py-5">
          {/* --- 3. TÍTULOS BLANCOS --- */}
          <h1 className="mb-4 text-white">Información de Pago y Envío</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Columna Izquierda: Resumen y Formulario */}
              <Col md={7}>
                {/* --- 4. TARJETA OSCURA --- */}
                <Card className="border-0 shadow-sm mb-4" bg="dark" text="white">
                  <Card.Header as="h5" className="bg-dark">Resumen de tu compra</Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {itemsToShow.map((item: CartItem) => (
                        <ListGroup.Item 
                          key={item.product.id} 
                          className="d-flex justify-content-between align-items-center bg-dark text-white" // <-- Fondo oscuro
                        >
                          <Image src={item.product.image} alt={item.product.name} style={{ width: '50px' }} rounded />
                          <span>{item.product.name} (x{item.quantity})</span>
                          <span className="fw-bold">${(item.product.price * item.quantity).toLocaleString('es-CL')}</span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>

                {/* --- 3. TÍTULOS BLANCOS --- */}
                <h3 className="mb-3 text-white">Información del cliente</h3>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formNombre">
                      {/* --- 5. APLICA ESTILOS A LABELS E INPUTS --- */}
                      <Form.Label className={styles.formLabel}>Nombre</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                        className={styles.formInput} 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formApellidos">
                      <Form.Label className={styles.formLabel}>Apellidos</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={apellidos} 
                        onChange={(e) => setApellidos(e.target.value)} 
                        required 
                        className={styles.formInput} 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formCorreo">
                  <Form.Label className={styles.formLabel}>Correo Electrónico</Form.Label>
                  <Form.Control 
                    type="email" 
                    value={correo} 
                    onChange={(e) => setCorreo(e.target.value)} 
                    required 
                    className={styles.formInput} 
                  />
                </Form.Group>

                <h3 className="mb-3 mt-4 text-white">Dirección de entrega</h3>
                <Form.Group className="mb-3" controlId="formCalle">
                  <Form.Label className={styles.formLabel}>Calle</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ej: Av. Siempre Viva 123" 
                    value={calle} 
                    onChange={(e) => setCalle(e.target.value)} 
                    required 
                    className={styles.formInput} 
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDepto">
                  <Form.Label className={styles.formLabel}>Departamento (opcional)</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ej: Depto 101" 
                    value={depto} 
                    onChange={(e) => setDepto(e.target.value)} 
                    className={styles.formInput} 
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formRegion">
                      <Form.Label className={styles.formLabel}>Región</Form.Label>
                      <Form.Select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className={styles.formInput} // <-- Aplica estilo
                      >
                        {regions.map(rName => (
                          <option key={rName} value={rName}>{rName}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formComuna">
                      <Form.Label className={styles.formLabel}>Comuna</Form.Label>
                      <Form.Select
                        value={comuna}
                        onChange={(e) => setComuna(e.target.value)}
                        disabled={communes.length === 0}
                        className={styles.formInput} // <-- Aplica estilo
                      >
                        {communes.map(cName => (
                          <option key={cName} value={cName}>{cName}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>

              {/* Columna Derecha: Total y Botón de Pago */}
              <Col md={5}>
                {/* --- 4. TARJETA OSCURA --- */}
                <Card className="border-0 shadow-sm sticky-top" style={{ top: '100px' }} bg="dark" text="white">
                  <Card.Body>
                    <Card.Title className="fs-3 mb-3">Total a Pagar</Card.Title>
                    {/* --- 6. CAMBIA EL TOTAL AL COLOR PRIMARIO (ROJO) --- */}
                    <h2 className="text-primary fw-bold mb-4">
                      ${totalToShow.toLocaleString('es-CL')}
                    </h2>
                    <div className="d-grid">
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