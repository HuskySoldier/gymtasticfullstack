import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // --- Lógica de Validación (Simulada) ---
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    // --- Lógica de Autenticación (Simulada) ---
    // Aquí iría la llamada a tu API o servicio de autenticación
    console.log('Iniciando sesión con:', { email, password });

    // Simulación de un login exitoso
    if (email === "admin@gym.com" && password === "admin") {
      // Si es admin, redirigir al panel de admin
      navigate('/admin');
    } else {
      // Si es usuario normal, redirigir al home
      navigate('/');
    }
  };

  return (
    // Usamos 'min-vh-100' para que el footer (si lo añades) quede al fondo
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'var(--gym-light)' }}>
      <NavBar />
      
      {/* Contenedor principal que centra el formulario */}
      <div className={styles.loginPage}>
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5} xl={4}>
              <Card className={styles.loginCard}>
                <Card.Body className="p-4 p-sm-5">
                  <h2 className={styles.cardTitle}>Iniciar Sesión</h2>
                  
                  <Form onSubmit={handleSubmit}>
                    {/* Alerta de Error */}
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* Campo de Email */}
                    <Form.Group className="mb-3" controlId="loginEmail">
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
                    <Form.Group className="mb-4" controlId="loginPassword">
                      <Form.Label className={styles.formLabel}>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        className={styles.formInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    {/* Botón de Submit (con el gradiente) */}
                    <div className="d-grid">
                      <button type="submit" className="btn-primary-gradient">
                        Entrar
                      </button>
                    </div>
                  </Form>

                  {/* Enlaces de ayuda */}
                  <div className="text-center mt-4">
                    <Link to="/registro" className={styles.helperLink}>
                      ¿No tienes cuenta? <span className="text-primary">Crear una</span>
                    </Link>
                  </div>
                  <div className="text-center mt-2">
                    <Link to="/recuperar-clave" className={styles.helperLink}>
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Aquí podrías importar y añadir tu componente Footer */}
    </div>
  );
};