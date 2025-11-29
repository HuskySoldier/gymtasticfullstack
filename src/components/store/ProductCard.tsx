import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import type { Product } from '../../interfaces/app.interfaces';
import { useCart, type CartContextType } from '../../context/CartContext';
import { formatCurrency, formatStock } from '../../helpers'; 

import styles from './ProductCard.module.css';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  // Asegúrate de que el hook useCart esté tipado si es necesario, o déjalo simple
  const { addToCart } = useCart() as CartContextType;

  const handleViewDetails = () => {
    navigate(`/producto/${product.id}`);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  // Lógica simple: Si stock es 0 o null, no hay stock
  const hasStock = product.stock !== 0 && product.stock !== null;

  return (
    <Card 
      className={`h-100 ${styles.card}`} 
      bg="dark" 
      text="white" 
      style={{ backgroundColor: 'var(--gym-dark-secondary)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div style={{ position: 'relative' }}>
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.name} 
          className={styles.cardImage}
          style={{ opacity: hasStock ? 1 : 0.6 }} // Un toque sutil: imagen un poco más opaca si no hay stock
        />
        {/* Opcional: Una etiqueta pequeña y discreta si está agotado */}
        {!hasStock && (
          <div 
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: '#dc3545', // Rojo
              color: 'white',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}
          >
            AGOTADO
          </div>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center mb-3">{product.name}</Card.Title>
        
        <Card.Text className="text-center text-primary fw-bold fs-5 mb-3">
          {formatCurrency(product.price)}
        </Card.Text>
        
        <Card.Text 
            className={styles.description} 
            style={{ color: 'var(--gym-text-secondary)', flexGrow: 1 }}
        >
          {product.description.length > 100 
            ? product.description.substring(0, 100) + '...' 
            : product.description}
        </Card.Text>
        
        <div className="mt-auto d-grid gap-2">
          <Button 
            variant="outline-primary" 
            onClick={handleViewDetails}
          >
            <i className="fa-solid fa-eye me-2"></i> Ver más
          </Button>
          
          <Button 
            variant="success" 
            onClick={handleAddToCart}
            disabled={!hasStock} // <--- Aquí bloqueamos la compra sin romper el diseño
          >
            <i className="fa-solid fa-cart-plus me-2"></i> 
            {hasStock ? `${formatStock(product.stock)} en Stock` : 'Sin Stock'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};