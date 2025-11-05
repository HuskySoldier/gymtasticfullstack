import { Link, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { useCart } from '../../context/CartContext'; 

export const NavBar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <Navbar 
      bg="dark"      /* <-- CAMBIO: Fondo oscuro */
      variant="dark"    /* <-- CAMBIO: Texto claro */
      expand="lg" 
      className="border-bottom border-secondary shadow-sm"
      sticky="top"
    >
      <Container>
        {/* 'text-primary' ahora usará nuestro amarillo (var(--bs-primary)) */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary">
          <i className="fa-solid fa-bolt me-2"></i>
          GYMTASTIC
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={NavLink} to="/ofertas">Ofertas</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>
          
          <Nav>
            {/* 'btn-outline-primary' ahora usará nuestro amarillo */ }
            <Nav.Link as={NavLink} to="/login" className="btn btn-outline-primary me-2 mb-2 mb-lg-0">
              Iniciar Sesión
            </Nav.Link>
            {/* 'btn-primary' ahora usará nuestro amarillo */ }
            <Nav.Link as={NavLink} to="/registro" className="btn btn-primary me-3 mb-2 mb-lg-0">
              Crear Cuenta
            </Nav.Link>
            
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