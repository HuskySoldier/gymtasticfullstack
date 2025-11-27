import { useState } from 'react';
import { Container, Row, Col, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import styles from './RegisterPage.module.css';
import { validateRegistration } from '../../helpers';
// --- IMPORTAR SERVICIO ---
import { createUser } from '../../services/user.service';

export const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(''); // Para feedback visual antes de redirigir
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    // 1. Validación local (Frontend)
    const validationResult = validateRegistration({
      nombre,
      apellidos,
      email,
      password,
      confirmPassword
    });

    if (!validationResult.isValid) {
      setError(validationResult.message || 'Error de validación.');
      setLoading(false);
      return;
    }

    try {
      // 2. Llamada al Backend (Register Service)
      // El servicio real ya devuelve una promesa o lanza error
      await createUser({
        name: `${nombre.trim()} ${apellidos.trim()}`, // Unimos nombre y apellido para el campo 'name' del front
        email: email.trim(),
        password: password,
        role: 'Cliente' // Rol por defecto
      });
      
      setSuccessMsg('¡Cuenta creada con éxito! Redirigiendo al login...');
      
      // 3. Redirigir al Login tras 1.5 segundos para que el usuario lea el mensaje
      setTimeout(() => {
        navigate('/login');
      }, 1500);

} catch (err) {
      console.error("Error en registro:", err);
      // Verificamos si 'err' es un objeto Error estándar para acceder a .message
      const errorMessage = (err instanceof Error) 
        ? err.message 
        : "Error al registrar el usuario. Inténtalo más tarde.";
        
      setError(errorMessage);
      setLoading(false);
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
                    {successMsg && <Alert variant="success">{successMsg}</Alert>}

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="registerNombre">
                          <Form.Label className={styles.formLabel}>Nombre</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Tu nombre"
                            className={styles.formInput}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            disabled={loading}
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
                            disabled={loading}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="registerEmail">
                      <Form.Label className={styles.formLabel}>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tu@correo.com"
                        className={styles.formInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
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
                        disabled={loading}
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
                        disabled={loading}
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <button type="submit" className="btn-primary-gradient" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner as="span" size="sm" role="status" aria-hidden="true" className="me-2"/>
                                Registrando...
                            </>
                        ) : 'Registrarse'}
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