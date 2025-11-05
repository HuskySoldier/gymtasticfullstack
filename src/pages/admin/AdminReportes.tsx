import { Row, Col, Card, Spinner, Table, Button, Badge } from 'react-bootstrap'; // <-- Asegúrate que Row, Col, etc. estén importados
import { getUsers } from '../../services/user.service'; // <-- Se añade 'type'
import { getProducts } from '../../services/product.service';
import type { Product } from '../../interfaces/app.interfaces'; // <-- Se importa Product desde la fuente original
import styles from './AdminReportes.module.css';
import { useState, useEffect } from 'react';

interface ReportStats {
  userCount: number;
  productCount: number;
  inventoryValue: number;
  adminCount: number;
}

export const AdminReportes = () => {
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        // Obtenemos todos los datos en paralelo
        const [usersData, productsData] = await Promise.all([
          getUsers(),
          getProducts()
        ]);

        const users = usersData || [];
        const products = productsData.ok ? productsData.products : [];

        // 1. Calculamos Estadísticas
        const userCount = users.length;
        const adminCount = users.filter(u => u.role === 'Admin').length;
        const productCount = products.length;
        const inventoryValue = products.reduce((total, prod) => {
          const stock = (prod.stock === Infinity) ? 0 : prod.stock; // No contar membresías
          return total + (stock * prod.price);
        }, 0);

        setStats({ userCount, productCount, inventoryValue, adminCount });

        // 2. Reporte de Top 5 Productos (por precio)
        const sortedProducts = [...products]
          .sort((a, b) => b.price - a.price)
          .slice(0, 5);
        
        setTopProducts(sortedProducts);

      } catch (err) {
        console.error("Error al generar reportes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const handleDownloadReport = (reportType: 'users' | 'products' | 'inventory') => {
    // --- Simulación de Descarga ---
    // En una app real, aquí usarías una librería como papaparse (CSV) o jsPDF
    console.log(`Simulando descarga de reporte: ${reportType}`);
    alert(`Iniciando descarga (simulada) del reporte de ${reportType}.`);
  };

  if (loading || !stats) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p className="text-white">Generando reportes...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-white mb-4">Reportes</h1>
      
      {/* --- Tarjetas de Resumen --- */}
      <Row className="g-4 mb-4">
        <Col md={6} lg={3}>
          <div className={styles.statCard}>
            <i className={`fa-solid fa-users ${styles.statIcon}`}></i>
            <div>
              <div className={styles.statValue}>{stats.userCount}</div>
              <div className={styles.statLabel}>Usuarios Totales</div>
            </div>
          </div>
        </Col>
        <Col md={6} lg={3}>
          <div className={styles.statCard}>
            <i className={`fa-solid fa-box-open ${styles.statIcon}`}></i>
            <div>
              <div className={styles.statValue}>{stats.productCount}</div>
              <div className={styles.statLabel}>Productos Totales</div>
            </div>
          </div>
        </Col>
        <Col md={6} lg={3}>
          <div className={styles.statCard}>
            <i className={`fa-solid fa-dollar-sign ${styles.statIcon}`}></i>
            <div>
              <div className={styles.statValue}>${stats.inventoryValue.toLocaleString('es-CL')}</div>
              <div className={styles.statLabel}>Valor de Inventario</div>
            </div>
          </div>
        </Col>
        <Col md={6} lg={3}>
          <div className={styles.statCard}>
            <i className={`fa-solid fa-shield-halved ${styles.statIcon}`}></i>
            <div>
              <div className={styles.statValue}>{stats.adminCount}</div>
              <div className={styles.statLabel}>Administradores</div>
            </div>
          </div>
        </Col>
      </Row>

      {/* --- Secciones de Reportes Detallados --- */}
      <Row className="g-4">
        {/* Sección de Descarga */}
        <Col md={4}>
          <Card className={styles.reportSection}>
            <Card.Header as="h5" className={styles.reportHeader}>
              <i className="fa-solid fa-download me-2"></i>
              Generar Reporte
            </Card.Header>
            <Card.Body>
              <p className="text-secondary">
                Genera y descarga un archivo .CSV con los datos maestros.
              </p>
              <div className="d-grid gap-3">
                <Button 
                  className={styles.downloadButton}
                  onClick={() => handleDownloadReport('users')}
                >
                  Descargar Reporte de Usuarios
                </Button>
                <Button 
                  className={styles.downloadButton}
                  onClick={() => handleDownloadReport('products')}
                >
                  Descargar Reporte de Productos
                </Button>
                <Button 
                  className={styles.downloadButton}
                  onClick={() => handleDownloadReport('inventory')}
                >
                  Descargar Reporte de Inventario
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Sección de Top Productos */}
        <Col md={8}>
          <Card className={styles.reportSection}>
            <Card.Header as="h5" className={styles.reportHeader}>
              <i className="fa-solid fa-star me-2"></i>
              Top 5 Productos (Por Precio)
            </Card.Header>
            <Card.Body>
              <Table striped variant="dark">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map(prod => (
                    <tr key={prod.id}>
                      <td>{prod.id}</td>
                      <td>{prod.name}</td>
                      <td><Badge bg="secondary">{prod.category}</Badge></td>
                      <td className="text-success fw-bold">${prod.price.toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};