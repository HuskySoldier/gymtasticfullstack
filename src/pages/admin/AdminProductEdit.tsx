import { useState, useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm } from './ProductForm';
import { getProductById, updateProduct } from '../../services/product.service';
import type { Product } from '../../interfaces/app.interfaces';

export const AdminProductEdit = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        navigate('/admin/productos');
        return;
      }

      try {
        setLoading(true);
        const response = await getProductById(Number(id));
        if (response.ok && response.product) {
          setProduct(response.product);
        } else {
          setError('Producto no encontrado.');
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error de conexión.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleEditProduct = async (productData: Omit<Product, 'id'>) => {
    if (!id) return;
    setError(null);
    setSuccess(null);
    
    try {
      const response = await updateProduct(Number(id), productData);
      if (response.ok) {
        setSuccess(`¡Producto "${response.product?.name}" actualizado con éxito!`);
        setTimeout(() => navigate('/admin/productos'), 1500);
      } else {
        setError('Error al actualizar el producto.');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Error de conexión al actualizar.');
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p className="text-white">Cargando producto...</p>
      </div>
    );
  }

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      {product && (
        <ProductForm 
          isEditMode={true}
          initialData={product}
          onSubmit={handleEditProduct}
        />
      )}
    </div>
  );
};