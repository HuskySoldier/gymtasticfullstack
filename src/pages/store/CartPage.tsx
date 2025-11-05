import { Container, Row, Col, Card, ListGroup, Button, Image, InputGroup, Form } from 'react-bootstrap';
// Quitamos 'Link' de esta importación ya no es necesario para el botón
import { useNavigate } from 'react-router-dom'; 
import { useCart } from '../../context/CartContext';
import { NavBar } from '../../components/shared/NavBar';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Navega a tu página de Checkout existente
  };

  // --- 1. AQUÍ ESTÁ LA NUEVA FUNCIÓN ---
  const handleGoToStore = () => {
    navigate('/');
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      <NavBar />
      <Container className="py-5">
        
        {cart.length === 0 ? (
          // --- VISTA DE CARRITO VACÍO ---
          <div className="text-center">
            <i className="fa-solid fa-cart-shopping fa-5x text-secondary mb-3"></i>
            <h1 className="text-white">Tu carrito está vacío</h1>
            <p className="text-secondary mb-4">
              Parece que aún no has añadido productos.
            </p>
            
            {/* --- 2. AQUÍ ESTÁ LA CORRECCIÓN --- */}
            <Button onClick={handleGoToStore} variant="primary" size="lg">
              <i className="fa-solid fa-store me-2"></i>
              Ir a la tienda
            </Button>
          </div>
        ) : (
          // --- VISTA DE CARRITO LLENO ---
          <Row>
            <Col>
              <Card bg="dark" text="white" className="border-secondary">
                <Card.Header as="h3" className="border-secondary">
                  Carrito de Compras ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {cart.map(item => (
                      <ListGroup.Item 
                        key={item.product.id} 
                        className="bg-dark text-white d-flex flex-wrap align-items-center"
                      >
                        {/* Imagen y Nombre */}
                        <Col xs={12} md={5} className="d-flex align-items-center mb-2 mb-md-0">
                          <Image 
                            src={item.product.image} 
                            alt={item.product.name} 
                            style={{ width: '80px' }} 
                            rounded 
                          />
                          <span className="ms-3 fs-5">{item.product.name}</span>
                        </Col>
                        
                        {/* Precio Unitario */}
                        <Col xs={6} md={2} className="text-md-center">
                          <span className="text-secondary d-md-none">Precio: </span>
                          ${item.product.price.toLocaleString('es-CL')}
                        </Col>

                        {/* Cantidad */}
                        <Col xs={6} md={2} className="text-md-center">
                          <InputGroup size="sm" style={{ maxWidth: '120px', margin: 'auto' }}>
                            <Button 
                              variant="outline-secondary" 
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            > - </Button>
                            <Form.Control
                              type="text"
                              readOnly
                              value={item.quantity}
                              className="text-center bg-dark text-white border-secondary"
                            />
                            <Button 
                              variant="outline-secondary" 
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            > + </Button>
                          </InputGroup>
                        </Col>

                        {/* Subtotal */}
                        <Col xs={6} md={2} className="text-md-center">
                          <span className="text-secondary d-md-none">Subtotal: </span>
                          <span className="fw-bold">
                            ${(item.product.price * item.quantity).toLocaleString('es-CL')}
                          </span>
                        </Col>

                        {/* Eliminar */}
                        <Col xs={6} md={1} className="text-md-end">
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </Button>
                        </Col>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
                
                {/* Footer con Totales y Acciones */}
                <Card.Footer className="border-secondary d-flex flex-wrap justify-content-between align-items-center">
                  <div>
                    <Button variant="outline-danger" onClick={clearCart}>
                      <i className="fa-solid fa-times me-2"></i>
                      Vaciar Carrito
                    </Button>
                  </div>
                  <div className="text-end mt-3 mt-md-0">
                    <h3 className="text-white mb-2">
                      Total: 
                      <span className="text-success fw-bold ms-2">
                        ${getTotalPrice().toLocaleString('es-CL')}
                      </span>
                    </h3>
                    <Button variant="success" size="lg" onClick={handleCheckout}>
                      <i className="fa-solid fa-check me-2"></i>
                      Comprar ahora
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};