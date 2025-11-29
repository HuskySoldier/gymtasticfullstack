import { Container, Row, Col, Card, ListGroup, Button, Image, InputGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { NavBar } from '../../components/shared/NavBar';
import { formatCurrency } from '../../helpers'; // Usamos tu helper para formatear precios

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      <NavBar />
      <Container className="py-5">
        
        {cart.length === 0 ? (
          <div className="text-center mt-5">
            <i className="fa-solid fa-cart-shopping fa-5x text-secondary mb-3"></i>
            <h2 className="text-white">Tu carrito está vacío</h2>
            <p className="text-secondary mb-4">Parece que aún no has añadido productos.</p>
            <Button onClick={() => navigate('/')} variant="primary" size="lg">
              <i className="fa-solid fa-store me-2"></i> Ir a la tienda
            </Button>
          </div>
        ) : (
          <Row>
            <Col>
              <Card bg="dark" text="white" className="border-secondary shadow">
                <Card.Header className="border-secondary h4">
                  Carrito de Compras ({cart.length} items)
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {cart.map(item => (
                      <ListGroup.Item key={item.product.id} className="bg-dark text-white border-secondary d-flex flex-wrap align-items-center py-3">
                        
                        {/* Imagen */}
                        <Col xs={12} md={2} className="text-center mb-3 mb-md-0">
                          <Image src={item.product.image} alt={item.product.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} rounded />
                        </Col>

                        {/* Nombre */}
                        <Col xs={12} md={4} className="mb-3 mb-md-0">
                          <h5 className="mb-1">{item.product.name}</h5>
                          <small className="text-secondary">Unitario: {formatCurrency(item.product.price)}</small>
                        </Col>

                        {/* Cantidad */}
                        <Col xs={6} md={3} className="d-flex justify-content-center">
                          <InputGroup size="sm" style={{ width: '120px' }}>
                            <Button variant="outline-secondary" onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}>-</Button>
                            <Form.Control className="text-center bg-dark text-white border-secondary" value={item.quantity} readOnly />
                            <Button variant="outline-secondary" onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}>+</Button>
                          </InputGroup>
                        </Col>

                        {/* Subtotal y Eliminar */}
                        <Col xs={6} md={3} className="text-end d-flex align-items-center justify-content-end gap-3">
                          <span className="fw-bold fs-5 text-primary">
                            {formatCurrency(item.product.price * item.quantity)}
                          </span>
                          <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.product.id)}>
                            <i className="fa-solid fa-trash"></i>
                          </Button>
                        </Col>

                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
                
                <Card.Footer className="border-secondary p-4">
                  <Row className="align-items-center">
                    <Col md={6} className="mb-3 mb-md-0">
                      <Button variant="outline-danger" onClick={clearCart}>
                        <i className="fa-solid fa-trash-can me-2"></i> Vaciar Carrito
                      </Button>
                    </Col>
                    <Col md={6} className="text-md-end">
                      <h3 className="mb-3">Total: <span className="text-primary">{formatCurrency(getTotalPrice())}</span></h3>
                      <Button variant="success" size="lg" onClick={() => navigate('/checkout')}>
                        Proceder al Pago <i className="fa-solid fa-arrow-right ms-2"></i>
                      </Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};