import { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getOrders } from '../../services/order.service';
import { getProducts } from '../../services/product.service';
import { getUsers } from '../../services/user.service';

// Interface para guardar las estadísticas
interface DashboardStats {
  orderCount: number;
  productCount: number;
  userCount: number;
  totalRevenue: number;
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Obtenemos todos los datos en paralelo para más eficiencia
        const [ordersData, productsData, usersData] = await Promise.all([
          getOrders(),
          getProducts(),
          getUsers()
        ]);

        // Calculamos los totales
        const orderCount = ordersData.length;
        const productCount = productsData.ok ? productsData.products.length : 0;
        const userCount = usersData.length;
        
        // (Extra) Calculamos el total de ventas de órdenes "Completadas"
        const totalRevenue = ordersData
          .filter(order => order.status === 'Completado')
          .reduce((total, order) => total + order.total, 0);

        setStats({ orderCount, productCount, userCount, totalRevenue });

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("No se pudieron cargar los datos del dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // El array vacío asegura que esto se ejecute solo una vez, al cargar la página

  // --- Renderizado Condicional ---
  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p className="text-white mt-2">Cargando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!stats) {
    return <Alert variant="warning">No hay estadísticas disponibles.</Alert>;
  }

  // --- Contenido del Dashboard (ya con datos) ---
  return (
    <div>
      <h1 className="text-white mb-4">Dashboard</h1>
      <p className="text-secondary mb-4">Resumen de las actividades de la tienda.</p>

      {/* Tarjetas de Resumen (Figura 9) */}
      <Row className="mb-4 g-4">
        {/* Total de Ventas (Calculado) */}
        <Col md={3}>
          <Card bg="success" text="white" className="h-100">
            <Card.Body className="d-flex align-items-center">
              <i className="fa-solid fa-dollar-sign fa-3x me-3"></i>
              <div>
                <Card.Title className="fs-2">
                  ${stats.totalRevenue.toLocaleString('es-CL')}
                </Card.Title>
                <Card.Text>Ingresos (Completado)</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Compras (Órdenes) */}
        <Col md={3}>
          <Card bg="primary" text="white" className="h-100">
            <Card.Body className="d-flex align-items-center">
              <i className="fa-solid fa-cart-shopping fa-3x me-3"></i>
              <div>
                <Card.Title className="fs-2">
                  {stats.orderCount}
                </Card.Title>
                <Card.Text>Órdenes Totales</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Productos */}
        <Col md={3}>
          <Card bg="info" text="dark" className="h-100">
            <Card.Body className="d-flex align-items-center">
              <i className="fa-solid fa-box fa-3x me-3"></i>
              <div>
                <Card.Title className="fs-2">
                  {stats.productCount}
                </Card.Title>
                <Card.Text>Productos</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Clientes/Usuarios */}
        <Col md={3}>
          <Card bg="warning" text="dark" className="h-100">
            <Card.Body className="d-flex align-items-center">
              <i className="fa-solid fa-users fa-3x me-3"></i>
              <div>
                <Card.Title className="fs-2">
                  {stats.userCount}
                </Card.Title>
                <Card.Text>Clientes/Usuarios</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tarjetas de Acceso Rápido (Ahora son links) */}
      <h2 className="text-white h4 mt-5 mb-3">Accesos Directos</h2>
      <Row>
        <Col md={4} className="mb-3">
          <Link to="/admin/ordenes" className="text-decoration-none">
            <Card bg="dark" text="white" className="border-secondary h-100">
              <Card.Body>
                <Card.Title><i className="fa-solid fa-receipt me-2 text-primary"></i> Órdenes</Card.Title>
                <Card.Text className="text-secondary">Gestión y seguimiento de todas las órdenes de compra.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} className="mb-3">
          <Link to="/admin/productos" className="text-decoration-none">
            <Card bg="dark" text="white" className="border-secondary h-100">
              <Card.Body>
                <Card.Title><i className="fa-solid fa-box-open me-2 text-info"></i> Productos</Card.Title>
                <Card.Text className="text-secondary">Administrar inventario, detalles y precios de los productos.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} className="mb-3">
          <Link to="/admin/usuarios" className="text-decoration-none">
            <Card bg="dark" text="white" className="border-secondary h-100">
              <Card.Body>
                <Card.Title><i className="fa-solid fa-users me-2 text-warning"></i> Usuarios</Card.Title>
                <Card.Text className="text-secondary">Gestión de cuentas de usuario y sus roles dentro del sistema.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};