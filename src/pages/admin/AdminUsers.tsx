import { useState, useEffect } from 'react';
import { UserOrderHistoryModal } from '../../components/admin/UserOrderHistoryModal';
import { Row, Col, Card, Form, Button, Table, Spinner, Alert, Modal, Badge } from 'react-bootstrap';
import { getUsers, createUser, updateUser, deleteUser, type User } from '../../services/user.service';
// Reutilizamos los estilos de formulario que ya tenemos
import formStyles from '../store/RegisterPage.module.css';

// Tipo para el estado del formulario
type UserFormData = Omit<User, 'id'>;

const initialFormState: UserFormData = {
  name: '',
  email: '',
  password: '',
  role: 'Cliente',
};

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [userForHistory, setUserForHistory] = useState<User | null>(null);

  const handleShowHistory = (user: User) => {
    setUserForHistory(user);
    setShowHistoryModal(true);
  };

  // --- Estado del Formulario ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState<UserFormData>(initialFormState);
  const [formLoading, setFormLoading] = useState(false);

  // --- Estado del Modal ---
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Error al cargar usuarios.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setIsEditMode(false);
    setCurrentId(null);
    setFormData(initialFormState);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormLoading(true);
    setError(null);
    
    try {
      if (isEditMode && currentId) {
        // --- Modo Edición ---
        // Preparamos los datos para actualizar. Si la contraseña está vacía, no la enviamos.
        const { password, ...restData } = formData;
        const updates: Partial<Omit<User, 'id'>> = { ...restData };
        
        if (password) { // Solo actualiza la contraseña si se escribió una nueva
          updates.password = password;
        }
        
        await updateUser(currentId, updates);
      } else {
        // --- Modo Creación ---
        if (!formData.password) {
          setError('La contraseña es obligatoria al crear un nuevo usuario.');
          setFormLoading(false);
          return;
        }
        await createUser(formData);
      }
      handleClearForm();
      await fetchUsers(); // Recargar la lista
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Error al guardar el usuario.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditClick = (user: User) => {
    setIsEditMode(true);
    setCurrentId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: '', // Dejar la contraseña vacía por seguridad en modo edición
      role: user.role,
    });
    window.scrollTo(0, 0); // Sube al formulario
  };

  const handleShowDeleteModal = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);
      await fetchUsers(); // Recargar la lista
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Error al eliminar el usuario.');
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
                {isEditMode ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="userName">
                  <Form.Label className={formStyles.formLabel}>Nombre Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Ej: Pedro Hacker"
                    className={formStyles.formInput}
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="userEmail">
                  <Form.Label className={formStyles.formLabel}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="ej: pedro@correo.com"
                    className={formStyles.formInput}
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userPassword">
                  <Form.Label className={formStyles.formLabel}>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={isEditMode ? 'Dejar en blanco para no cambiar' : 'Contraseña'}
                    className={formStyles.formInput}
                    value={formData.password}
                    onChange={handleFormChange}
                    required={!isEditMode} // Requerido solo al crear
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userRole">
                  <Form.Label className={formStyles.formLabel}>Rol</Form.Label>
                  <Form.Select
                    name="role"
                    className={formStyles.formInput}
                    value={formData.role}
                    onChange={handleFormChange}
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Admin">Admin</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn-primary-gradient" disabled={formLoading}>
                    {formLoading ? <Spinner as="span" size="sm" /> : (isEditMode ? 'Guardar Cambios' : 'Crear Usuario')}
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
          <h1 className="text-white mb-4">Usuarios Existentes</h1>
          {loading && <Spinner animation="border" variant="primary" />}
          
          {!loading && !error && (
            <Table striped bordered hover variant="dark">
              <thead style={{ backgroundColor: 'var(--gym-primary)', color: 'var(--gym-dark)' }}>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Badge bg={user.role === 'Admin' ? 'primary' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td>
                      {/* ESTE ES EL BOTÓN NUEVO */}
                      <Button 
                        variant="outline-info" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleShowHistory(user)}
                        title="Ver Historial de Compras"
                      >
                        <i className="fa-solid fa-receipt"></i>
                      </Button>
                      
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEditClick(user)}
                        title="Editar"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleShowDeleteModal(user)}
                        title="Eliminar"
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

      {/* --- Modal de Historial de Compras --- */}
      <UserOrderHistoryModal 
        show={showHistoryModal}
        user={userForHistory}
        onHide={() => setShowHistoryModal(false)}
      />

      {/* --- Modal de Confirmación de Borrado --- */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          ¿Estás seguro de que deseas eliminar al usuario: <strong>{userToDelete?.name}</strong>?
          <br />
          <span className="text-danger">Esta acción es permanente.</span>
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