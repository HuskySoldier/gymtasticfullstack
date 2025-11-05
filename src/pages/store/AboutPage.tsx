import { Container, Row, Col, Image } from 'react-bootstrap';
import { NavBar } from '../../components/shared/NavBar';
import { Footer } from '../../components/shared/Footer'; // Importar el footer
import styles from './AboutPage.module.css';

export const AboutPage = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />

      <main className="flex-grow-1">
        {/* Encabezado de la página */}
        <div className={styles.pageHeader}>
          <Container>
            <h1 className={styles.pageTitle}>SOBRE NOSOTROS</h1>
            <p className={styles.pageSubtitle}>
              Somos más que una tienda. Somos el combustible para tu próxima meta.
            </p>
          </Container>
        </div>

        {/* Sección principal de "Nuestra Misión" */}
        <Container className="py-5">
          <Row className={styles.aboutSection}>
            <Col md={6} className="mb-4 mb-md-0">
              <Image 
                src="https://source.unsplash.com/800x600/?gym,modern,interior" 
                alt="Interior de Gimnasio" 
                className={styles.aboutImage} 
                fluid 
              />
            </Col>
            <Col md={6} className={`${styles.aboutText} ps-md-5`}>
              <h2>NUESTRA MISIÓN</h2>
              <p>
                En GYMTASTIC, nuestra misión es simple: proveer a atletas y entusiastas del fitness
                con el equipamiento, suplementos y ropa de la más alta calidad.
              </p>
              <p>
                Creemos que para alcanzar tu máximo potencial, no deberías tener que
                comprometer la calidad. Seleccionamos a mano cada producto, asegurándonos de que
                cumpla con nuestros estándares de rendimiento, durabilidad y confianza.
              </p>
              <p>
                No solo vendemos productos; construimos una comunidad fuerte.
              </p>
            </Col>
          </Row>
        </Container>

        {/* Sección de "Nuestros Pilares" */}
        <Container fluid className={styles.pillarsSection}>
          <Container className="py-5">
            <h2 className={styles.sectionTitle}>NUESTROS PILARES</h2>
            <Row>
              <Col md={4} className={styles.pillarsItem}>
                <i className={`fa-solid fa-award ${styles.pillarsIcon}`}></i>
                <h3 className={styles.pillarsTitle}>CALIDAD INIGUALABLE</h3>
                <p className={styles.pillarsText}>
                  Productos premium que resisten tus entrenamientos más intensos.
                </p>
              </Col>
              <Col md={4} className={styles.pillarsItem}>
                <i className={`fa-solid fa-bolt ${styles.pillarsIcon}`}></i>
                <h3 className={styles.pillarsTitle}>RENDIMIENTO MÁXIMO</h3>
                <p className={styles.pillarsText}>
                  Suplementos y equipamiento diseñados para resultados reales.
                </p>
              </Col>
              <Col md={4} className={styles.pillarsItem}>
                <i className={`fa-solid fa-users ${styles.pillarsIcon}`}></i>
                <h3 className={styles.pillarsTitle}>COMUNIDAD FUERTE</h3>
                <p className={styles.pillarsText}>
                  Únete a una red de atletas que se apoyan y crecen juntos.
                </p>
              </Col>
            </Row>
          </Container>
        </Container>
      </main>

      <Footer />
    </div>
  );
};