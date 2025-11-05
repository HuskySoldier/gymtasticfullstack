import { Row, Col, Card } from 'react-bootstrap';

export const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-white mb-4">Dashboard</h1>
      <p className="text-secondary mb-4">Resumen de las actividades diarias[cite: 284].</p>

      {/* Tarjetas de Resumen (Figura 9) */}
      <Row className="mb-4">
        <Col md={4}>
          <Card bg="primary" text="white" className="h-100">
            <Card.Body className="d-flex align-items-center">
              <i className="fa-solid fa-cart-shopping fa-3x me-3"></i>
              <div>
                <Card.Title className="fs-2">1,234</Card.Title>
                <Card.Text>Compras [cite: 285, 286]</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="success" text="white" className="h-100">
            <Card.Body className="d-flex align-items-center">
              <i className="fa-solid fa-box fa-3x me-3"></i>
              <div>
                <Card.Title className="fs-2">400</Card.Title>
                <Card.Text>Productos [cite: 290]</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="warning" text="dark" className="h-100">
            <Card.Body className="d-flex align-items-center">
              <i className="fa-solid fa-users fa-3x me-3"></i>
              <div>
                <Card.Title className="fs-2">1,890</Card.Title>
                <Card.Text>Clientes/Usuarios [cite: 291]</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tarjetas de Acceso Rápido (Figura 9) */}
      <h2 className="text-white h4 mt-5 mb-3">Accesos Directos</h2>
      <Row>
        <Col md={4} className="mb-3">
          <Card bg="dark" text="white" className="border-secondary h-100">
            <Card.Body>
              <Card.Title><i className="fa-solid fa-receipt me-2 text-primary"></i> Órdenes</Card.Title>
              <Card.Text className="text-secondary">Gestión y seguimiento de todas las órdenes de compra[cite: 296, 297].</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card bg="dark" text="white" className="border-secondary h-100">
            <Card.Body>
              <Card.Title><i className="fa-solid fa-box-open me-2 text-success"></i> Productos</Card.Title>
              <Card.Text className="text-secondary">Administrar inventario, detalles y precios de los productos[cite: 298, 299].</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card bg="dark" text="white" className="border-secondary h-100">
            <Card.Body>
              <Card.Title><i className="fa-solid fa-users me-2 text-warning"></i> Usuarios</Card.Title>
              <Card.Text className="text-secondary">Gestión de cuentas de usuario y sus roles dentro del sistema[cite: 303, 304].</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};