import { useRoutes } from 'react-router-dom';

// --- Importa las páginas de la TIENDA ---
import { HomePage } from '../pages/store/HomePage';
import { ProductDetailPage } from '../pages/store/ProductDetailPage';
import { CheckoutPage } from '../pages/store/CheckoutPage';
import { CartPage } from '../pages/store/CartPage'; 
import { OrderSuccessPage } from '../pages/store/OrderSuccessPage';
import { OrderFailPage } from '../pages/store/OrderFailPage';
import { CategoriesPage } from '../pages/store/CategoriesPage';
import { ProductListPage } from '../pages/store/ProductListPage';
import { LoginPage } from '../pages/store/LoginPage';
import { RegisterPage } from '../pages/store/RegisterPage';
import { AboutPage } from '../pages/store/AboutPage';
import { BlogPage } from '../pages/store/BlogPage';
import { BlogDetailPage } from '../pages/store/BlogDetailPage'; 
import { ContactPage } from '../pages/store/ContactPage';

// --- Importa el Layout y las páginas de ADMIN ---
import { AdminLayout } from '../pages/admin/AdminLayout';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminProducts } from '../pages/admin/AdminProducts';
import { AdminOrders } from '../pages/admin/AdminOrders';
import { AdminCategories } from '../pages/admin/AdminCategories';
import { AdminUsers } from '../pages/admin/AdminUsers';
import { AdminReportes } from '../pages/admin/AdminReportes';
import { AdminProfile } from '../pages/admin/AdminProfile';



export const AppRoutes = () => {
    const routes = useRoutes([
        // --- Rutas públicas de la TIENDA ---
        { path: '/', element: <HomePage /> },
        { path: '/producto/:id', element: <ProductDetailPage /> },
        
        { path: '/categorias', element: <CategoriesPage /> },
        { path: '/categoria/:categoryName', element: <ProductListPage /> }, 

        { path: '/blog', element: <BlogPage /> }, // <--- 4. ACTUALIZADO
        { path: '/blog/:slug', element: <BlogDetailPage /> }, // <--- 5. NUEVA RUTA
        
        { path: '/nosotros', element: <AboutPage /> }, // <--- 3. ACTUALIZADO
        { path: '/contacto', element: <ContactPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/registro', element: <RegisterPage /> },
        { path: '/carrito', element: <CartPage /> }, 
        { path: '/checkout', element: <CheckoutPage /> },
        { path: '/compra-exitosa/:orderId', element: <OrderSuccessPage /> },
        { path: '/compra-fallida', element: <OrderFailPage /> },
        { path: '/contacto', element: <ContactPage /> },

        // --- Rutas privadas del ADMINISTRADOR ---
        {
          path: '/admin',
          element: <AdminLayout />,
          children: [
            { index: true, element: <AdminDashboard /> },
            { path: 'productos', element: <AdminProducts /> },
            { path: 'ordenes', element: <AdminOrders /> },
            { path: 'categorias', element: <AdminCategories /> },
            { path: 'usuarios', element: <AdminUsers /> },
            { path: 'reportes', element: <AdminReportes /> },
            { path: 'perfil', element: <AdminProfile /> },
          ]
        },

        // --- Ruta por defecto (404) ---
        {
            path: '*',
            element: (
              <div className="text-white text-center p-5 bg-dark min-vh-100">
                <h1>Error 404</h1>
                <p>Página no encontrada.</p>
              </div>
            )
        }
    ]);

    return routes;
}