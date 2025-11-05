import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from './ProductForm';
import { createProduct } from '../../services/product.service';
import type { Product } from '../../interfaces/app.interfaces';

export const AdminProductCreate = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateProduct = async (productData: Omit<Product, 'id'>) => {
    setError(null);
    setSuccess(null);
    try {
      const response = await createProduct(productData);
      if (response.ok) {
        setSuccess(`¡Producto "${response.product?.name}" creado con éxito!`);
        setTimeout(() => navigate('/admin/productos'), 1500); // Redirige
      } else {
        setError('Error al crear el producto.');
      }
    } catch (err) {
      setError('Error de conexión al crear.');
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <ProductForm 
        isEditMode={false}
        onSubmit={handleCreateProduct}
      />
    </div>
  );
};