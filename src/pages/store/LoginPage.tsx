import { useState } from 'react';
import { Container, Row, Col, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import styles from './LoginPage.module.css';

// --- 1. IMPORTA LOS HOOKS Y SERVICIOS ---
import { useAuth } from '../../context/AuthContext';
import { getUsers } from '../../services/user.service';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // <-- Añadido
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- 2. Obtén la función 'login' del contexto

  // --- 3. CONVIERTE LA FUNCIÓN EN ASYNC ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      setLoading(false);
      return;
    }

    try {
      // --- 4. LÓGICA DE AUTENTICACIÓN (REAL) ---
      const allUsers = await getUsers();
      
      // Busca al usuario por email
      const foundUser = allUsers.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
      
      // Valida la contraseña (Simulada: tu mock no tiene passwords reales,
      // así que usamos la data hardcodeada que ya tenías como fallback)
      const passwordIsValid = (email === "admin@gym.com" && password === "admin") || 
                              (foundUser && password.length > 0); // Simulación de pass correcto

      if (foundUser && passwordIsValid) {
        // --- 5. LLAMA AL CONTEXTO ---
        login(foundUser); // ¡Aquí guardas al usuario globalmente!

        // Redirige según el rol
        if (foundUser.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError('Correo o contraseña incorrectos.');
        setLoading(false);
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />
      
      <div className={styles.loginPage}>
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5} xl={4}>
              <Card className={styles.loginCard}>
                <Card.Body className="p-4 p-sm-5">
                  <h2 className={styles.cardTitle}>Iniciar Sesión</h2>
                  
                  <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group className="mb-3" controlId="loginEmail">
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

                    <Form.Group className="mb-4" controlId="loginPassword">
                      <Form.Label className={styles.formLabel}>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        className={styles.formInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                      />
                    </Form.Group>

                    {/* --- 6. ACTUALIZA EL BOTÓN --- */}
                    <div className="d-grid">
                      <button type="submit" className="btn-primary-gradient" disabled={loading}>
                        {loading ? <Spinner as="span" size="sm" /> : 'Entrar'}
                      </button>
                    </div>
                  </Form>

                  <div className="text-center mt-4">
                    <Link to="/registro" className={styles.helperLink}>
                      ¿No tienes cuenta? <span className="text-primary">Crear una</span>
                    </Link>
                  </div>
                  {/* ... (resto) ... */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};