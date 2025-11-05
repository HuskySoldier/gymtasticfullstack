import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { AdminSidebar } from '../../components/admin/AdminSidebar';

export const AdminLayout = () => {
  return (
    <Container fluid className="min-vh-100">
      <Row>
        {/* Columna de la Barra Lateral (Sidebar) */}
        <Col 
          as="nav" 
          md={3} 
          lg={2} 
          className="bg-dark text-white p-3 vh-100" 
          style={{ position: 'sticky', top: 0, height: '100vh' }}
        >
          <AdminSidebar />
        </Col>

        {/* Columna del Contenido Principal */}
        <Col 
          as="main" 
          md={9} 
          lg={10} 
          className="p-4"
          style={{ backgroundColor: '#212529' }} // Un fondo oscuro para el contenido
        >
          {/* Aquí se renderizarán las páginas anidadas (Dashboard, Productos, etc.) */}
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};