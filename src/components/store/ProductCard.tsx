import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import type { Product } from '../../interfaces/app.interfaces';
import { useCart, type CartContextType } from '../../context/CartContext';

// Importa los estilos modulares
import styles from './ProductCard.module.css';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const { addToCart } = useCart() as CartContextType;

  const handleViewDetails = () => {
    navigate(`/producto/${product.id}`);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    console.log(`Añadido ${product.name} al carrito`);
  };

  return (
    // Usa 'styles.card'
    <Card className={`h-100 ${styles.card}`}>
      <Card.Img 
        variant="top" 
        src={product.image} 
        alt={product.name} 
        className={styles.cardImage}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{product.name}</Card.Title>
        <Card.Text className="text-center text-success fw-bold fs-5">
          ${product.price.toLocaleString('es-CL')}
        </Card.Text>
        
        <Card.Text className={styles.description}>
          {product.description.substring(0, 100)}...
        </Card.Text>
        
        <div className="mt-auto d-grid gap-2">
          {/* Este botón ahora será dorado */}
          <Button 
            variant="outline-primary"
            onClick={handleViewDetails}
          >
            <i className="fa-solid fa-eye me-2"></i> Ver más...
          </Button>
          <Button 
            variant="success"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <i className="fa-solid fa-cart-plus me-2"></i> 
            {product.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};