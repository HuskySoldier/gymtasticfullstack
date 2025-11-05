import { useEffect, useState } from 'react';
import { Table, Button, Spinner, Alert, Modal, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/product.service';
import type { Product } from '../../interfaces/app.interfaces';

export const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // --- Estados para el Modal de Confirmación (Profesional) ---
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProducts();
      if (response.ok) {
        setProducts(response.products);
      } else {
        setError('Error al cargar los productos.');
      }
    } catch (err) {
      setError('Error de conexión con el servicio.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await deleteProduct(productToDelete.id);
      if (response.ok) {
        // Actualizar la UI instantáneamente
        setProducts(products.filter(p => p.id !== productToDelete.id));
      } else {
        setError('No se pudo eliminar el producto.');
      }
    } catch (err) {
      setError('Error de conexión al eliminar.');
    } finally {
      handleCloseDeleteModal();
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-white">Gestionar Productos</h1>
        <button 
          className="btn-primary-gradient" 
          onClick={() => handleNavigate('/admin/productos/nuevo')}
        >
          <i className="fa-solid fa-plus me-2"></i>
          Crear Nuevo Producto
        </button>
      </div>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover variant="dark">
          <thead style={{ backgroundColor: 'var(--gym-primary)', color: 'var(--gym-dark)' }}>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <Image src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} rounded />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toLocaleString('es-CL')}</td>
                <td>{product.stock === Infinity ? 'Ilimitado' : product.stock}</td>
                <td>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleNavigate(`/admin/productos/editar/${product.id}`)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleShowDeleteModal(product)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* --- Modal de Confirmación de Borrado --- */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          ¿Estás seguro de que deseas eliminar el producto: <strong>{productToDelete?.name}</strong>?
          <br />
          <span className="text-danger">Esta acción no se puede deshacer.</span>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white">
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};