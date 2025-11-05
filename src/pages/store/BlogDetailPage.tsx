import { Container, Row, Col, Image, Alert, Breadcrumb, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import { Footer } from '../../components/shared/Footer';
import { mockBlogPosts } from '../../data/mock-blog'; // Importamos los datos
import styles from './BlogDetailPage.module.css';

export const BlogDetailPage = () => {
  const { slug } = useParams(); // Lee el ':slug' de la URL
  const navigate = useNavigate();
  
  // Busca el post en nuestros datos simulados
  const post = mockBlogPosts.find(p => p.slug === slug);

  if (!post) {
    // Si no se encuentra el post, muestra un error
    return (
      <div className="min-vh-100 d-flex flex-column">
        <NavBar />
        <Container className="text-center py-5 flex-grow-1">
          <Alert variant="danger">
            <h2>Post no encontrado</h2>
            <p>El artículo que estás buscando no existe.</p>
            <Button variant="primary" onClick={() => navigate('/blog')}>Volver al Blog</Button>
          </Alert>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />

      <main className="flex-grow-1">
        {/* Encabezado del Artículo */}
        <div className={styles.articleHeader}>
          <Container>
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/blog" }}>Blog</Breadcrumb.Item>
              <Breadcrumb.Item active>{post.title}</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className={styles.articleTitle}>{post.title}</h1>
            <p className={styles.articleMeta}>
              Por <strong>{post.author}</strong> - {post.date}
            </p>
          </Container>
        </div>

        {/* Contenido del Artículo */}
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <Image 
                src={post.imageUrl} 
                alt={post.title} 
                fluid 
                className={styles.mainImage}
              />
              {/* Usamos 'dangerouslySetInnerHTML' para renderizar el HTML
                de nuestros datos simulados. 
                ¡SOLO haz esto si confías 100% en la fuente del HTML!
              */}
              <div 
                className={styles.articleBody} 
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
};