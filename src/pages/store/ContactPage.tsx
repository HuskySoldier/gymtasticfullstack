import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { NavBar } from '../../components/shared/NavBar';
import { Footer } from '../../components/shared/Footer';
import styles from './ContactPage.module.css';

export const ContactPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nombre || !email || !mensaje) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // --- Lógica de Envío (Simulada) ---
    console.log('Enviando mensaje:', { nombre, email, mensaje });
    
    // Simulación de envío exitoso
    setSuccess('¡Mensaje enviado con éxito! Te responderemos pronto.');
    
    // Limpiar formulario
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />
      
      <main className="flex-grow-1">
        {/* Encabezado de la página */}
        <div className={styles.pageHeader}>
          <Container>
            <h1 className={styles.pageTitle}>CONTÁCTANOS</h1>
            <p className={styles.pageSubtitle}>
              ¿Tienes preguntas o sugerencias? Estamos aquí para ayudarte.
            </p>
          </Container>
        </div>

        {/* Sección de Contacto */}
        <Container className={styles.contactSection}>
          <Row className="g-4">
            {/* Columna Izquierda: Formulario */}
            <Col md={7}>
              <Card className={styles.contactCard}>
                <Card.Body className="p-4 p-sm-5">
                  <h2 className={styles.cardTitle}>Envíanos un Mensaje</h2>
                  
                  <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <Form.Group className="mb-3" controlId="contactNombre">
                      <Form.Label className={styles.formLabel}>Tu Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu nombre completo"
                        className={styles.formInput}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contactEmail">
                      <Form.Label className={styles.formLabel}>Tu Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tu@correo.com"
                        className={styles.formInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-4" controlId="contactMensaje">
                      <Form.Label className={styles.formLabel}>Tu Mensaje</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="¿En qué podemos ayudarte?"
                        className={styles.formInput}
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <button type="submit" className="btn-primary-gradient">
                        Enviar Mensaje
                      </button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Columna Derecha: Información */}
            <Col md={5}>
              <Card className={styles.contactCard}>
                <Card.Body className="p-4 p-sm-5">
                  <h2 className={styles.cardTitle}>Infórmación</h2>
                  
                  <div className={styles.mapContainer}>
                    {/* Placeholder de mapa profesional */}
                    <img 
                      src="https://source.unsplash.com/600x400/?map,city" 
                      alt="Mapa de ubicación"
                    />
                  </div>
                  
                  <ul className={styles.infoList}>
                    <li className="mt-4">
                      <i className="fa-solid fa-location-dot"></i>
                      <div>
                        <strong>Dirección:</strong>
                        <br />
                        <span className="text-secondary">Av. Siempre Viva 123, Santiago</span>
                      </div>
                    </li>
                    <li>
                      <i className="fa-solid fa-phone"></i>
                      <div>
                        <strong>Teléfono:</strong>
                        <br />
                        <span className="text-secondary">+56 9 1234 5678</span>
                      </div>
                    </li>
                    <li>
                      <i className="fa-solid fa-envelope"></i>
                      <div>
                        <strong>Email:</strong>
                        <br />
                        <span className="text-secondary">contacto@gymtastic.com</span>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
};