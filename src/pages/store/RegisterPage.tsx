import { useState } from 'react';
import { Container, Row, Col, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import { createUser } from '../../services/user.service'; // Asegúrate de importar esto
import styles from './RegisterPage.module.css';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validaciones básicas
    if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Todos los campos son obligatorios.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      // Llamada al servicio real (Backend)
      await createUser({
        name: formData.nombre,
        email: formData.email,
        password: formData.password,
        role: 'Cliente' // Por defecto
      });
      
      setSuccess('¡Cuenta creada con éxito! Redirigiendo al login...');
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message || 'Error al registrar el usuario.');
      } else {
        setError(String(err) || 'Error al registrar el usuario.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark">
      <NavBar />
      
      <div className={styles.registerPage}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className={styles.registerCard}>
                <Card.Body className="p-4 p-sm-5">
                  <div className="text-center mb-4">
                    <i className="fa-solid fa-user-plus fa-3x text-primary mb-3"></i>
                    <h2 className={styles.cardTitle}>Crear Cuenta</h2>
                    {/* Texto en blanco para mejor contraste */}
                    <p className="text-white small">Únete a la comunidad Gymtastic</p>
                  </div>
                  
                  <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger" className="py-2 text-center small">{error}</Alert>}
                    {success && <Alert variant="success" className="py-2 text-center small">{success}</Alert>}

                    <Form.Group className="mb-3" controlId="regNombre">
                      <Form.Label className={styles.formLabel}>Nombre Completo</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre"
                        className={styles.formInput}
                        value={formData.nombre}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="regEmail">
                      <Form.Label className={styles.formLabel}>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="tu@correo.com"
                        className={styles.formInput}
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="regPass">
                          <Form.Label className={styles.formLabel}>Contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="******"
                            className={styles.formInput}
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4" controlId="regConfirmPass">
                          <Form.Label className={styles.formLabel}>Confirmar</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="******"
                            className={styles.formInput}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary btn-lg fw-bold" disabled={loading}>
                        {loading ? (
                          <>
                            <Spinner as="span" size="sm" role="status" aria-hidden="true" className="me-2"/>
                            Registrando...
                          </>
                        ) : 'REGISTRARME'}
                      </button>
                    </div>
                  </Form>

                  <div className="text-center mt-4">
                    <Link to="/login" className={styles.helperLink}>
                      ¿Ya tienes cuenta? <span className="text-primary">Inicia Sesión</span>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};