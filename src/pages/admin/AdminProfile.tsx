import { useState, useEffect } from 'react';
import { Card, Form, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { getUserById, updateUser, User } from '../../services/user.service';
// Reutilizamos los estilos de formulario que ya tenemos
import formStyles from '../store/RegisterPage.module.css';

// --- Simulación de Autenticación ---
// En una app real, obtendrías esto de un Contexto de Auth.
// Usamos el ID 2, que corresponde a "admin@gym.com" en el mock service.
const CURRENT_USER_ID = 2; 

export const AdminProfile = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const user = await getUserById(CURRENT_USER_ID);
        if (user) {
          setFormData({ name: user.name, email: user.email });
        } else {
          setError('No se pudo cargar el perfil del administrador.');
        }
      } catch (err) {
        setError('Error de conexión al cargar el perfil.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setFormLoading(true);

    // --- Validación ---
    if (password && password !== confirmPassword) {
      setError('Las nuevas contraseñas no coinciden.');
      setFormLoading(false);
      return;
    }

    try {
      const updates: Partial<Omit<User, 'id'>> = { ...formData };
      if (password) {
        updates.password = password; // Solo incluye la contraseña si se cambió
      }

      await updateUser(CURRENT_USER_ID, updates);
      setSuccess('¡Perfil actualizado con éxito!');
      // Limpiar campos de contraseña
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Error al actualizar el perfil.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p className="text-white">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-white mb-4">Perfil de Administrador</h1>
      <Row>
        <Col lg={8} xl={6}>
          <Card className={formStyles.registerCard}>
            <Card.Body className="p-4 p-sm-5">
              <h2 className={formStyles.cardTitle}>Tu Información</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="profileName">
                  <Form.Label className={formStyles.formLabel}>Nombre Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    className={formStyles.formInput}
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="profileEmail">
                  <Form.Label className={formStyles.formLabel}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    className={formStyles.formInput}
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>

                <hr className="border-secondary" />
                
                <h3 className={formStyles.cardTitle} style={{ fontSize: '1.75rem' }}>
                  Cambiar Contraseña
                </h3>
                
                <Form.Group className="mb-3" controlId="profilePassword">
                  <Form.Label className={formStyles.formLabel}>Nueva Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Dejar en blanco para no cambiar"
                    className={formStyles.formInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                
                <Form.Group className="mb-4" controlId="profileConfirmPassword">
                  <Form.Label className={formStyles.formLabel}>Confirmar Nueva Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repetir nueva contraseña"
                    className={formStyles.formInput}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid">
                  <button type="submit" className="btn-primary-gradient" disabled={formLoading}>
                    {formLoading ? <Spinner as="span" size="sm" /> : 'Actualizar Perfil'}
                  </button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};