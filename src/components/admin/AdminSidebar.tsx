import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

export const AdminSidebar = () => {
  // Estilo para los NavLink
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-link text-white fw-bold' : 'nav-link text-secondary';

  return (
    <>
      <Navbar.Brand as={NavLink} to="/admin" className="text-white fs-4 mb-3 d-block">
        <i className="fa-solid fa-shield-halved me-2"></i>
        Admin Panel
      </Navbar.Brand>
      
      <Nav className="flex-column" variant="pills">
        {/* Enlaces basados en el diagrama de flujo (Figura 10) */}
        <Nav.Item>
          <NavLink to="/admin" end className={navLinkStyle}>
            <i className="fa-solid fa-chart-line me-2"></i> Dashboard
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/admin/ordenes" className={navLinkStyle}>
            <i className="fa-solid fa-receipt me-2"></i> Órdenes / Boletas
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/admin/productos" className={navLinkStyle}>
            <i className="fa-solid fa-box-open me-2"></i> Productos
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/admin/categorias" className={navLinkStyle}>
            <i className="fa-solid fa-tags me-2"></i> Categorías
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/admin/usuarios" className={navLinkStyle}>
            <i className="fa-solid fa-users me-2"></i> Usuarios
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/admin/reportes" className={navLinkStyle}>
            <i className="fa-solid fa-file-excel me-2"></i> Reportes
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/admin/perfil" className={navLinkStyle}>
            <i className="fa-solid fa-user-gear me-2"></i> Perfil
          </NavLink>
        </Nav.Item>
        
        <hr className="border-secondary" />

        {/* Enlace para volver a la tienda */}
        <Nav.Item>
          <NavLink to="/" className="text-info">
            <i className="fa-solid fa-store me-2"></i> Volver a la Tienda
          </NavLink>
        </Nav.Item>
      </Nav>
    </>
  );
};