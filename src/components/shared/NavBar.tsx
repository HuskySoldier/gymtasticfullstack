import { Link, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { useCart } from '../../context/CartContext'; // Importamos nuestro hook

export const NavBar = () => {

  const { cart } = useCart();
  
  // Calculamos el total de items en el carrito
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Calculamos el precio total
  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom border-secondary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <i className="fa-solid fa-dumbbell me-2"></i>
          GymStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Usamos NavLink para la clase "active" automática */}
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={NavLink} to="/ofertas">Ofertas</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav>
            {/* Botones de la derecha del PDF */}
            <Nav.Link as={NavLink} to="/login" className="btn btn-outline-primary me-2">
              Iniciar Sesión
            </Nav.Link>
            <Nav.Link as={NavLink} to="/registro" className="btn btn-primary me-3">
              Crear Cuenta
            </Nav.Link>
            {/* Botón del carrito */}
            <Nav.Link as={NavLink} to="/carrito" className="btn btn-success">
              <i className="fa-solid fa-cart-shopping me-1"></i>
              Carrito 
              {totalItems > 0 && (
                <Badge pill bg="light" text="dark" className="ms-1">
                  {totalItems}
                </Badge>
              )}
              <span className="fw-bold ms-2">${totalPrice.toLocaleString('es-CL')}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};