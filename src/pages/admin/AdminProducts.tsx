import { useEffect, useState } from 'react';
import { Table, Button, Spinner, Alert, Modal, Image, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/product.service';
import type { Product } from '../../interfaces/app.interfaces';

// --- 1. IMPORTAMOS LOS NUEVOS HELPERS Y HOOKS ---
import { formatCurrency, formatStock } from '../../helpers';
import { useModal } from '../../hooks';

const CRITICAL_STOCK_LEVEL = 30;

export const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [showCriticalOnly, setShowCriticalOnly] = useState(false);

  // --- 2. REFACTORIZAMOS EL ESTADO DEL MODAL ---
  // const [showDeleteModal, setShowDeleteModal] = useState(false); // <--- Línea antigua
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal(); // <--- Nueva línea
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

  // --- 3. USAMOS LA FUNCIÓN DEL HOOK ---
  const handleShowDeleteModal = (product: Product) => {
    setProductToDelete(product);
    // setShowDeleteModal(true); // <--- Línea antigua
    openDeleteModal(); // <--- Nueva línea
  };

  // --- 4. USAMOS LA FUNCIÓN DEL HOOK ---
  const handleCloseDeleteModal = () => {
    // setShowDeleteModal(false); // <--- Línea antigua
    closeDeleteModal(); // <--- Nueva línea
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await deleteProduct(productToDelete.id);
      if (response.ok) {
        setProducts(products.filter(p => p.id !== productToDelete.id));
      } else {
        setError('No se pudo eliminar el producto.');
      }
    } catch (err) {
      setError('Error de conexión al eliminar.');
    } finally {
      handleCloseDeleteModal(); // Esto ya estaba bien
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const displayedProducts = showCriticalOnly
    ? products.filter(p => p.stock !== Infinity && p.stock <= CRITICAL_STOCK_LEVEL)
    : products;

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

      <Form.Group className="mb-3" controlId="stockFilter">
        <Form.Check 
          type="switch"
          label="Mostrar solo productos con stock crítico (menos de 30)"
          className="text-white"
          checked={showCriticalOnly}
          onChange={(e) => setShowCriticalOnly(e.target.checked)}
        />
      </Form.Group>

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
            {displayedProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <Image src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} rounded />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                
                {/* --- 5. USAMOS EL HELPER DE MONEDA --- */}
                <td>{formatCurrency(product.price)}</td>
                
                {/* --- 6. USAMOS EL HELPER DE STOCK --- */}
                <td className={product.stock !== Infinity && product.stock <= CRITICAL_STOCK_LEVEL ? 'text-danger fw-bold' : ''}>
                  {formatStock(product.stock)}
                </td>
                
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

      {/* --- 7. USAMOS EL ESTADO DEL HOOK --- */}
      <Modal 
        show={isDeleteModalOpen} // <--- Usamos el estado del hook
        onHide={handleCloseDeleteModal} 
        centered
      >
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