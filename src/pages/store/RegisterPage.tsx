import { useState } from 'react';
import { Container, Row, Col, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import styles from './RegisterPage.module.css';
import { validateRegistration } from '../../helpers';
// --- 1. IMPORTA EL SERVICIO DE USUARIO ---
import { createUser } from '../../services/user.service';

export const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  // --- 2. AÑADE UN ESTADO DE CARGA ---
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // --- 3. CONVIERTE LA FUNCIÓN EN ASYNC ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); 
    setLoading(true); // <-- Activa el estado de carga

    const validationResult = validateRegistration({
      nombre,
      apellidos,
      email,
      password,
      confirmPassword
    });

    if (!validationResult.isValid) {
      setError(validationResult.message || 'Error de validación desconocido.');
      setLoading(false); // <-- Detiene la carga si hay error
      return;
    }

    // --- 4. LLAMA AL SERVICIO 'createUser' ---
    try {
      await createUser({
        name: `${nombre.trim()} ${apellidos.trim()}`, // Combina nombre y apellido
        email: email.trim(),
        password: password,
        role: 'Cliente' // Asigna el rol por defecto
      });
      
      // Redirigir al login después del registro exitoso
      navigate('/login');

    } catch (err) {
      console.error("Error en el registro:", err);
      setError("Error al registrar el usuario. Inténtalo de nuevo.");
      setLoading(false); // <-- Detiene la carga si hay error
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />
      
      <div className={styles.registerPage}>
        <Container>
          <Row className="justify-content-center">
            <Col md={7} lg={6} xl={5}>
              <Card className={styles.registerCard}>
                <Card.Body className="p-4 p-sm-5">
                  <h2 className={styles.cardTitle}>Crear Cuenta</h2>
                  
                  <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Row>
                      {/* ... (campos de Nombre y Apellidos) ... */}
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="registerNombre">
                          <Form.Label className={styles.formLabel}>Nombre</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Tu nombre"
                            className={styles.formInput}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            disabled={loading} // <-- Deshabilita mientras carga
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="registerApellidos">
                          <Form.Label className={styles.formLabel}>Apellidos</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Tus apellidos"
                            className={styles.formInput}
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            disabled={loading} // <-- Deshabilita mientras carga
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* ... (campos de Email, Password, Confirmar) ... */}
                    <Form.Group className="mb-3" controlId="registerEmail">
                      <Form.Label className={styles.formLabel}>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tu@correo.com"
                        className={styles.formInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading} // <-- Deshabilita mientras carga
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="registerPassword">
                      <Form.Label className={styles.formLabel}>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        className={styles.formInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading} // <-- Deshabilita mientras carga
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="registerConfirmPassword">
                      <Form.Label className={styles.formLabel}>Confirmar Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirma tu contraseña"
                        className={styles.formInput}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading} // <-- Deshabilita mientras carga
                      />
                    </Form.Group>

                    {/* --- 5. ACTUALIZA EL BOTÓN --- */}
                    <div className="d-grid">
                      <button type="submit" className="btn-primary-gradient" disabled={loading}>
                        {loading ? (
                          <>
                            <Spinner as="span" size="sm" role="status" aria-hidden="true" />
                            <span className="ms-2">Registrando...</span>
                          </>
                        ) : (
                          'Registrarse'
                        )}
                      </button>
                    </div>
                  </Form>

                  <div className="text-center mt-4">
                    <Link to="/login" className={styles.helperLink}>
                      ¿Ya tienes cuenta? <span className="text-primary">Iniciar Sesión</span>
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