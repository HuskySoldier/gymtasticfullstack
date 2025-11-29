import { useState } from 'react';
import { Container, Row, Col, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import styles from './LoginPage.module.css';

import { useAuth } from '../../context/AuthContext';
import { loginUserReal, type User } from '../../services/user.service'; 

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth(); 

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
      const response = await loginUserReal({ email, password });
      
      if (response && response.success) {
        const backendUser = response.user;
        const token = response.token; 

        if (token) localStorage.setItem('gym_token', token);
        
        const userForContext: User = {
            id: 0, 
            name: backendUser.nombre,
            email: backendUser.email,
            role: (backendUser.rol && backendUser.rol.toLowerCase() === 'admin') ? 'Admin' : 'Cliente',
            fono: backendUser.fono,
            avatarUri: backendUser.avatarUri,
            planEndMillis: backendUser.planEndMillis
        };
        
        login(userForContext); 

        if (userForContext.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError(response?.message || 'Credenciales incorrectas.');
        setLoading(false);
      }

    } catch (err) {
      console.error(err);
      setError('Error de conexión.');
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark">
      <NavBar />
      
      <div className={styles.loginPage}>
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5} xl={4}>
              <Card className={styles.loginCard}>
                <Card.Body className="p-4 p-sm-5">
                  <div className="text-center mb-4">
                    <i className="fa-solid fa-dumbbell fa-3x text-primary mb-3"></i>
                    <h2 className={styles.cardTitle}>Bienvenido</h2>
                    {/* --- CAMBIO: text-white en lugar de text-muted --- */}
                    <p className="text-white small">Ingresa a tu cuenta Gymtastic</p>
                  </div>
                  
                  <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger" className="py-2 text-center small">{error}</Alert>}

                    <Form.Group className="mb-3" controlId="loginEmail">
                      <Form.Label className={styles.formLabel}>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="ejemplo@gymtastic.cl"
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
                        placeholder="••••••••"
                        className={styles.formInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                      />
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary btn-lg fw-bold" disabled={loading}>
                        {loading ? (
                          <>
                            <Spinner as="span" size="sm" role="status" aria-hidden="true" className="me-2"/>
                            Procesando...
                          </>
                        ) : 'INICIAR SESIÓN'}
                      </button>
                    </div>
                  </Form>

                  <div className="text-center mt-4">
                    <Link to="/registro" className={styles.helperLink}>
                      ¿Nuevo aquí? <span className="text-primary">Regístrate gratis</span>
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