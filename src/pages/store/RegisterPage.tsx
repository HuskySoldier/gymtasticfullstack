import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import styles from './RegisterPage.module.css'; // Importamos los estilos

export const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // --- Validación de campos ---
    if (!nombre || !apellidos || !email || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // --- Lógica de Registro (Simulada) ---
    console.log('Registrando nuevo usuario:', { nombre, apellidos, email, password });

    // Simulación de un registro exitoso
    // Aquí iría la llamada a tu API o servicio de autenticación
    
    // Redirigir al login después del registro exitoso
    navigate('/login');
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'var(--gym-light)' }}>
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
                      {/* Campo de Nombre */}
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="registerNombre">
                          <Form.Label className={styles.formLabel}>Nombre</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Tu nombre"
                            className={styles.formInput}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      {/* Campo de Apellidos */}
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="registerApellidos">
                          <Form.Label className={styles.formLabel}>Apellidos</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Tus apellidos"
                            className={styles.formInput}
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Campo de Email */}
                    <Form.Group className="mb-3" controlId="registerEmail">
                      <Form.Label className={styles.formLabel}>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tu@correo.com"
                        className={styles.formInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    {/* Campo de Contraseña */}
                    <Form.Group className="mb-3" controlId="registerPassword">
                      <Form.Label className={styles.formLabel}>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Crea una contraseña"
                        className={styles.formInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    
                    {/* Campo de Confirmar Contraseña */}
                    <Form.Group className="mb-4" controlId="registerConfirmPassword">
                      <Form.Label className={styles.formLabel}>Confirmar Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirma tu contraseña"
                        className={styles.formInput}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>

                    {/* Botón de Submit (con el gradiente) */}
                    <div className="d-grid">
                      <button type="submit" className="btn-primary-gradient">
                        Registrarse
                      </button>
                    </div>
                  </Form>

                  {/* Enlace de ayuda */}
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