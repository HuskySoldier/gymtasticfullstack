import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { useCart } from '../../context/CartContext'; 
import { useAuth } from '../../context/AuthContext';
// --- 1. IMPORTA EL HELPER ---
import { formatCurrency } from '../../helpers';

export const NavBar = () => {
  const { cart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige al inicio
  };

  return (
    <Navbar 
      bg="dark"      
      variant="dark"    
      expand="lg" 
      className="border-bottom border-secondary shadow-sm"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary">
          <i className="fa-solid fa-bolt me-2"></i>
          GYMTASTIC
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              // --- SI ESTÁ LOGUEADO ---
              <NavDropdown 
                title={
                  <>
                    <i className="fa-solid fa-user me-2"></i>
                    Hola, {user?.name.split(' ')[0]}
                  </>
                } 
                id="user-menu-dropdown"
                align="end"
              >
                {user?.role === 'Admin' && (
                  <NavDropdown.Item as={Link} to="/admin">
                    <i className="fa-solid fa-shield-halved me-2"></i>
                    Panel Admin
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket me-2"></i>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>

            ) : (
              // --- SI NO ESTÁ LOGUEADO ---
              <>
                <Nav.Link as={NavLink} to="/login" className="btn btn-outline-primary me-2 mb-2 mb-lg-0">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={NavLink} to="/registro" className="btn btn-primary me-3 mb-2 mb-lg-0">
                  Crear Cuenta
                </Nav.Link>
              </>
            )}
            
            <Nav.Link as={NavLink} to="/carrito" className="btn btn-success ms-lg-2">
              <i className="fa-solid fa-cart-shopping me-1"></i>
              Carrito 
              {totalItems > 0 && (
                <Badge pill bg="light" text="dark" className="ms-1">
                  {totalItems}
                </Badge>
              )}
              {/* --- 2. USA EL HELPER IMPORTADO --- */}
              <span className="fw-bold ms-2">{formatCurrency(totalPrice)}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
