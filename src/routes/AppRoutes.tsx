// src/routes/AppRoutes.tsx
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

// --- Layout y páginas ADMIN ---
import { AdminLayout } from '../pages/admin/AdminLayout';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminProducts } from '../pages/admin/AdminProducts';
import { AdminOrders } from '../pages/admin/AdminOrders';
import { AdminCategories } from '../pages/admin/AdminCategories';
import { AdminUsers } from '../pages/admin/AdminUsers';
import { AdminReportes } from '../pages/admin/AdminReportes';
import { AdminProfile } from '../pages/admin/AdminProfile';
import { AdminProductCreate } from '../pages/admin/AdminProductCreate';
import { AdminProductEdit } from '../pages/admin/AdminProductEdit';

// --- ProtectedRoute import ---
import { ProtectedRoute } from '../components/shared/ProtectedRoute';

export const AppRoutes = () => {
    
    const routes = useRoutes([
        // --- Rutas Públicas ---
        { path: '/', element: <HomePage /> },
        { path: '/producto/:id', element: <ProductDetailPage /> },
        { path: '/categorias', element: <CategoriesPage /> },
        { path: '/categoria/:categoryName', element: <ProductListPage /> },
        { path: '/nosotros', element: <AboutPage /> },
        { path: '/blog', element: <BlogPage /> },
        { path: '/blog/:slug', element: <BlogDetailPage /> },
        { path: '/contacto', element: <ContactPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/registro', element: <RegisterPage /> },
        { path: '/carrito', element: <CartPage /> },

        // --- Protegidas Cliente ---
        {
            element: <ProtectedRoute requiredRole="Cliente" />,
            children: [
                { path: '/checkout', element: <CheckoutPage /> },
                { path: '/compra-exitosa/:orderId', element: <OrderSuccessPage /> },
                { path: '/compra-fallida', element: <OrderFailPage /> },
            ]
        },

        // --- Módulo ADMIN Protegido ---
        {
            element: <ProtectedRoute requiredRole="Admin" />,
            children: [
                {
                    path: '/admin',
                    element: <AdminLayout />,
                    children: [
                        { index: true, element: <AdminDashboard /> },
                        { path: 'productos', element: <AdminProducts /> },
                        { path: 'productos/nuevo', element: <AdminProductCreate /> },
                        { path: 'productos/editar/:id', element: <AdminProductEdit /> },
                        { path: 'ordenes', element: <AdminOrders /> },
                        { path: 'categorias', element: <AdminCategories /> },
                        { path: 'usuarios', element: <AdminUsers /> },
                        { path: 'reportes', element: <AdminReportes /> },
                        { path: 'perfil', element: <AdminProfile /> },
                    ]
                }
            ]
        },

        // 🔚 Not Found 404
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
};
