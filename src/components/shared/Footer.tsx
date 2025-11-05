import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Usamos Link para la navegación interna

export const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Row>
          <Col md={3} className="mb-4">
            <h5 className="text-primary"><i className="fa-solid fa-bolt me-2"></i>GYMTASTIC</h5>
            <p>El siguiente nivel en equipamiento y suplementos.</p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
            </div>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h5>Navegación</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categorias">Categorías</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h5>Ayuda</h5>
            <ul className="footer-links">
              <li><Link to="/contacto">Soporte</Link></li>
              <li><Link to="#">Envíos y Devoluciones</Link></li>
              <li><Link to="#">FAQ</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contacto</h5>
            <ul className="footer-links">
              <li><p className="mb-1">Av. Siempre Viva 123</p></li>
              <li><p className="mb-1">contacto@gymtastic.com</p></li>
              <li><p>+56 9 1234 5678</p></li>
            </ul>
          </Col>
        </Row>
        <hr className="mt-4" style={{ borderColor: 'var(--gym-text-secondary)' }} />
        <p className="text-center text-secondary mt-4 mb-0">
          &copy; {new Date().getFullYear()} GYMTASTIC. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
};