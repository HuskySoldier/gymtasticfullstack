import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import type { Product } from '../../interfaces/app.interfaces';
import { useCart, type CartContextType } from '../../context/CartContext';
import { formatCurrency, formatStock } from '../../helpers'; // Importa helpers

import styles from './ProductCard.module.css';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  // ... (tus funciones handle... no cambian) ...
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
    // --- 1. AÑADE bg="dark" Y text="white" A LA TARJETA ---
    <Card 
      className={`h-100 ${styles.card}`} 
      bg="dark" // <-- USA EL FONDO OSCURO DE BOOTSTRAP
      text="white" // <-- USA TEXTO CLARO
      style={{ backgroundColor: 'var(--gym-dark-secondary)' }} // <-- Color gris oscuro
    >
      <Card.Img 
        variant="top" 
        src={product.image} 
        alt={product.name} 
        className={styles.cardImage}
      />
      <Card.Body className="d-flex flex-column">
        {/* 2. Título (ya es blanco por text="white") */}
        <Card.Title className="text-center">{product.name}</Card.Title>
        
        {/* 3. Precio (Cámbialo a tu color primario rojo) */}
        <Card.Text className="text-center text-primary fw-bold fs-5">
          {formatCurrency(product.price)}
        </Card.Text>
        
        {/* 4. Descripción (Usa el color secundario) */}
        <Card.Text className={styles.description} style={{ color: 'var(--gym-text-secondary)' }}>
          {product.description.substring(0, 100)}...
        </Card.Text>
        
        <div className="mt-auto d-grid gap-2">
          {/* 5. Botón "Ver más" (Cámbialo a outline-primary) */}
          <Button 
            variant="outline-primary" // <-- Era outline-primary (rojo)
            onClick={handleViewDetails}
          >
            <i className="fa-solid fa-eye me-2"></i> Ver más...
          </Button>
          <Button 
            variant="success" // Dejamos "success" para el carrito
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <i className="fa-solid fa-cart-plus me-2"></i> 
            {product.stock === 0 ? 'Agotado' : formatStock(product.stock) + ' en Stock'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};