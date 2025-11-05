import { useState, useEffect } from 'react';
import { Modal, Button, Spinner, Alert, Table, Badge } from 'react-bootstrap';
import { getOrders } from '../../services/order.service';
import type { Order } from '../../interfaces/app.interfaces';

interface User {
    name: string;
    email: string;
}

interface Props {
  user: User | null;
  show: boolean;
  onHide: () => void;
}

export const UserOrderHistoryModal: React.FC<Props> = ({ user, show, onHide }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && show) {
      const fetchUserOrders = async () => {
        setLoading(true);
        setError(null);
        try {
          const allOrders = await getOrders();
          // Filtramos las órdenes por el email del usuario
          const userOrders = allOrders.filter(
            (order) => order.customer.correo.toLowerCase() === user.email.toLowerCase()
          );
          setOrders(userOrders);
        } catch (err) {
          setError('No se pudo cargar el historial.');
        } finally {
          setLoading(false);
        }
      };
      fetchUserOrders();
    }
  }, [user, show]);

  const renderContent = () => {
    if (loading) {
      return <Spinner animation="border" variant="primary" />;
    }
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }
    if (orders.length === 0) {
      return <Alert variant="info">Este usuario no tiene historial de compras.</Alert>;
    }

    return (
      <Table striped bordered variant="dark" responsive>
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Items</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.date).toLocaleDateString('es-CL')}</td>
              <td>
                <Badge bg={order.status === 'Completado' ? 'success' : 'warning'}>
                  {order.status}
                </Badge>
              </td>
              <td>{order.items.length}</td>
              <td className="text-success">${order.total.toLocaleString('es-CL')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Historial de Compras</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <h5>Usuario: {user?.name}</h5>
        <p className="text-secondary">{user?.email}</p>
        <hr className="border-secondary" />
        {renderContent()}
      </Modal.Body>
      <Modal.Footer className="bg-dark text-white">
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};