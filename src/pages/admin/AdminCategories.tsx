import { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table, Spinner, Alert, Modal } from 'react-bootstrap';
import { getCategories, createCategory, updateCategory, deleteCategory, type Category } from '../../services/category.service';
// Reutilizamos los estilos de formulario que ya tenemos
import formStyles from '../store/RegisterPage.module.css';

export const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Estado del Formulario ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // --- Estado del Modal ---
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError('Error al cargar categorías.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setIsEditMode(false);
    setCurrentId(null);
    setCategoryName('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryName) {
      setError('El nombre de la categoría no puede estar vacío.');
      return;
    }
    
    setFormLoading(true);
    setError(null);
    
    try {
      if (isEditMode && currentId) {
        // --- Modo Edición ---
        await updateCategory(currentId, categoryName);
      } else {
        // --- Modo Creación ---
        await createCategory(categoryName);
      }
      handleClearForm();
      await fetchCategories(); // Recargar la lista
    } catch (err) {
      setError('Error al guardar la categoría.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditClick = (category: Category) => {
    setIsEditMode(true);
    setCurrentId(category.id);
    setCategoryName(category.name);
    window.scrollTo(0, 0); // Sube al formulario
  };

  const handleShowDeleteModal = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.id);
      await fetchCategories(); // Recargar la lista
    } catch (err) {
      setError('Error al eliminar la categoría.');
    } finally {
      handleCloseDeleteModal();
    }
  };


  return (
    <div>
      <Row className="g-4">
        {/* --- Columna del Formulario --- */}
        <Col md={4}>
          <Card className={formStyles.registerCard}>
            <Card.Body className="p-4">
              <h2 className={formStyles.cardTitle}>
                {isEditMode ? 'Editar Categoría' : 'Nueva Categoría'}
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="categoryName">
                  <Form.Label className={formStyles.formLabel}>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Suplementos"
                    className={formStyles.formInput}
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn-primary-gradient" disabled={formLoading}>
                    {formLoading ? <Spinner as="span" size="sm" /> : (isEditMode ? 'Guardar Cambios' : 'Crear Categoría')}
                  </button>
                  {isEditMode && (
                    <Button variant="outline-secondary" onClick={handleClearForm}>
                      Cancelar Edición
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* --- Columna de la Tabla --- */}
        <Col md={8}>
          <h1 className="text-white mb-4">Categorías Existentes</h1>
          {loading && <Spinner animation="border" variant="primary" />}
          
          {!loading && !error && (
            <Table striped bordered hover variant="dark">
              <thead style={{ backgroundColor: 'var(--gym-primary)', color: 'var(--gym-dark)' }}>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEditClick(cat)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleShowDeleteModal(cat)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      {/* --- Modal de Confirmación de Borrado --- */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          ¿Estás seguro de que deseas eliminar la categoría: <strong>{categoryToDelete?.name}</strong>?
          <br />
          <span className="text-danger">Si eliminas la categoría, los productos asociados podrían quedar sin categoría.</span>
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