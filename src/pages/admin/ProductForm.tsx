import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../interfaces/app.interfaces';
// Reutilizamos los estilos de formulario de Login/Register
import formStyles from '../store/RegisterPage.module.css';

interface ProductFormProps {
  initialData?: Product; // Datos para modo "Editar"
  onSubmit: (productData: Omit<Product, 'id'>) => Promise<void>;
  isEditMode: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, isEditMode }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState<'Membresías' | 'Suplementos' | 'Ropa' | 'Equipamiento'>('Suplementos');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price);
      setStock(initialData.stock === Infinity ? -1 : initialData.stock); // Usamos -1 para 'Ilimitado'
      setCategory(initialData.category);
      setImage(initialData.image);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const productData: Omit<Product, 'id'> = {
      name,
      description,
      price,
      stock: stock === -1 ? Infinity : stock, // Convertir -1 a Infinity
      category,
      image,
    };

    await onSubmit(productData);
    setLoading(false);
  };

  return (
    <Card className={formStyles.registerCard}>
      <Card.Body className="p-4 p-sm-5">
        <h2 className={formStyles.cardTitle}>
          {isEditMode ? 'Editar Producto' : 'Crear Producto'}
        </h2>
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label className={formStyles.formLabel}>Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Proteína Whey 5Lbs"
                  className={formStyles.formInput}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="productCategory">
                <Form.Label className={formStyles.formLabel}>Categoría</Form.Label>
                <Form.Select
                  className={formStyles.formInput}
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  required
                >
                  <option value="Membresías">Membresías</option>
                  <option value="Suplementos">Suplementos</option>
                  <option value="Ropa">Ropa</option>
                  <option value="Equipamiento">Equipamiento</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="productImage">
            <Form.Label className={formStyles.formLabel}>URL de la Imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://source.unsplash.com/..."
              className={formStyles.formInput}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productDescription">
            <Form.Label className={formStyles.formLabel}>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Descripción detallada del producto..."
              className={formStyles.formInput}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="productPrice">
                <Form.Label className={formStyles.formLabel}>Precio (CLP)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ej: 45000"
                  className={formStyles.formInput}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="productStock">
                <Form.Label className={formStyles.formLabel}>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ej: 50 (use -1 para Ilimitado)"
                  className={formStyles.formInput}
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  required
                />
                <Form.Text className="text-secondary">
                  Usa -1 para stock ilimitado (Ej: Membresías).
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button 
              variant="outline-secondary" 
              onClick={() => navigate('/admin/productos')}
              disabled={loading}
            >
              Cancelar
            </Button>
            <button type="submit" className="btn-primary-gradient" disabled={loading}>
              {loading ? <Spinner as="span" size="sm" /> : (isEditMode ? 'Guardar Cambios' : 'Crear Producto')}
            </button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};