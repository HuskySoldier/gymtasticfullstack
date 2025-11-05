import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavBar } from '../../components/shared/NavBar';
import { Footer } from '../../components/shared/Footer';
import { mockBlogPosts, type BlogPost } from '../../data/mock-blog'; // Importamos los datos
import styles from './BlogPage.module.css';

// Sub-componente para la tarjeta de artículo
const ArticleCard = ({ post }: { post: BlogPost }) => (
  <Card className={`${styles.blogCard} h-100`}>
    <Card.Img 
      variant="top" 
      src={post.imageUrl} 
      alt={post.title} 
      className={styles.cardImage}
    />
    <Card.Body className={styles.cardBody}>
      <Card.Text className={styles.cardMeta}>
        Por {post.author} - {post.date}
      </Card.Text>
      <Card.Title as="h2" className={styles.cardTitle}>{post.title}</Card.Title>
      <Card.Text className={styles.cardExcerpt}>
        {post.excerpt}
      </Card.Text>
      <Link to={`/blog/${post.slug}`} className={styles.readMoreBtn}>
        Leer Más <i className="fa-solid fa-arrow-right-long ms-1"></i>
      </Link>
    </Card.Body>
  </Card>
);

export const BlogPage = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />
      
      <main className="flex-grow-1">
        {/* Encabezado de la página */}
        <div className={styles.pageHeader}>
          <Container>
            <h1 className={styles.pageTitle}>GYMTASTIC Blog</h1>
            <p className={styles.pageSubtitle}>
              Consejos de entrenamiento, nutrición y las últimas noticias de la comunidad.
            </p>
          </Container>
        </div>

        {/* Lista de Artículos */}
        <Container className="py-5">
          <Row>
            {mockBlogPosts.map(post => (
              <Col key={post.id} lg={4} md={6} className="mb-4">
                <ArticleCard post={post} />
              </Col>
            ))}
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
};