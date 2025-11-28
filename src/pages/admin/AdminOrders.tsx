import { useState, useEffect } from 'react';
import { Table, Spinner, Alert, Badge, Card, Accordion, Row, Col } from 'react-bootstrap';
import { getOrders } from '../../services/order.service';
import type { Order, CartItem } from '../../interfaces/app.interfaces';

// Componente para mostrar una sola orden (Boleta)
const OrderDetails = ({ order }: { order: Order }) => {
  return (
    <Card bg="dark" text="white" className="border-secondary mb-3">
      <Card.Header>
        <Accordion.Button className="bg-dark text-white shadow-none border-0">
          <div className="d-flex justify-content-between w-100">
            <span>
              <strong>ID:</strong> {order.id}
            </span>
            <span className="ms-3">
              <strong>Cliente:</strong> {order.customer.nombre} {order.customer.apellidos}
            </span>
            <span className="ms-3">
              <strong>Total:</strong> 
              <span className="text-success fw-bold ms-2">
                ${order.total.toLocaleString('es-CL')}
              </span>
            </span>
            <Badge pill bg={order.status === 'Completado' ? 'success' : 'warning'} className="ms-3">
              {order.status}
            </Badge>
          </div>
        </Accordion.Button>
      </Card.Header>
      <Accordion.Body>
        <Row>
          <Col md={6}>
            <h5>Detalles del Cliente</h5>
            <p className="mb-1"><strong>Correo:</strong> {order.customer.correo}</p>
            <p className="mb-1"><strong>Dirección:</strong> {order.customer.calle}, {order.customer.depto}</p>
            <p className="mb-1"><strong>Comuna:</strong> {order.customer.comuna}, {order.customer.region}</p>
            <p className="mb-1"><strong>Fecha:</strong> {new Date(order.date).toLocaleString('es-CL')}</p>
          </Col>
          <Col md={6}>
            <h5>Productos ({order.items.length})</h5>
            <Table striped bordered hover variant="dark" size="sm">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cant.</th>
                  <th>Precio Unit.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item: CartItem) => (
                  <tr key={item.product.id}>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.product.price.toLocaleString('es-CL')}</td>
                    <td>${(item.product.price * item.quantity).toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Accordion.Body>
    </Card>
  );
};


export const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrders();
        setOrders(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error al cargar las órdenes.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="text-white">Cargando órdenes...</p>
        </div>
      );
    }
    
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }
    
    if (orders.length === 0) {
      return <Alert variant="info">No se han encontrado órdenes.</Alert>;
    }

    // Usamos un Accordion para mostrar las boletas [cite: 318]
    return (
      <Accordion flush>
        {orders.map(order => (
          <OrderDetails key={order.id} order={order} />
        ))}
      </Accordion>
    );
  };

  return (
    <div>
      <h1 className="text-white mb-4">Gestión de Órdenes y Boletas [cite: 317]</h1>
      {renderContent()}
    </div>
  );
};