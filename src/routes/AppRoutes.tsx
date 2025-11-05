import { useRoutes } from 'react-router-dom';

// Importa las páginas de la tienda
import { HomePage } from '../pages/store/HomePage';
import { ProductDetailPage } from '../pages/store/ProductDetailPage';
import { CheckoutPage } from '../pages/store/CheckoutPage';
import { CartPage } from '../pages/store/CartPage'; 
import { OrderSuccessPage } from '../pages/store/OrderSuccessPage';
import { OrderFailPage } from '../pages/store/OrderFailPage';
// --- NUEVAS PÁGINAS ---
import { CategoriesPage } from '../pages/store/CategoriesPage';
import { ProductListPage } from '../pages/store/ProductListPage';


// --- Importa el Layout y las páginas de ADMIN ---
// ... (imports de admin sin cambios)
import { AdminLayout } from '../pages/admin/AdminLayout';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminProducts } from '../pages/admin/AdminProducts';
import { AdminOrders } from '../pages/admin/AdminOrders';
import { AdminCategories } from '../pages/admin/AdminCategories';
import { AdminUsers } from '../pages/admin/AdminUsers';
import { AdminReportes } from '../pages/admin/AdminReportes';
import { AdminProfile } from '../pages/admin/AdminProfile';


// --- Placeholders (solo quedan los que no hemos construido) ---
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="text-white p-5 bg-dark min-vh-100">
    <h1 className="text-white">{title}</h1>
    <p>Esta página aún está en construcción.</p>
  </div>
);
// const CategoriesPage = () => <PlaceholderPage title="Categorías" />; // <-- ELIMINADO
const OffersPage = () => <PlaceholderPage title="Ofertas" />;
const AboutPage = () => <PlaceholderPage title="Nosotros" />;
const BlogPage = () => <PlaceholderPage title="Blog" />;
const ContactPage = () => <PlaceholderPage title="Contacto" />;
const LoginPage = () => <PlaceholderPage title="Iniciar Sesión" />;
const RegisterPage = () => <PlaceholderPage title="Crear Cuenta" />;
// --- Fin Placeholders ---


export const AppRoutes = () => {
    const routes = useRoutes([
        // --- Rutas públicas de la TIENDA ---
        { path: '/', element: <HomePage /> },
        { path: '/producto/:id', element: <ProductDetailPage /> },
        
        { path: '/categorias', element: <CategoriesPage /> }, // <-- ACTUALIZADO
        { path: '/categoria/:categoryName', element: <ProductListPage /> }, // <-- NUEVA RUTA
        
        { path: '/ofertas', element: <OffersPage /> },
        { path: '/nosotros', element: <AboutPage /> },
        { path: '/blog', element: <BlogPage /> },
        { path: '/contacto', element: <ContactPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/registro', element: <RegisterPage /> },
        { path: '/carrito', element: <CartPage /> }, 
        { path: '/checkout', element: <CheckoutPage /> },
        { path: '/compra-exitosa/:orderId', element: <OrderSuccessPage /> },
        { path: '/compra-fallida', element: <OrderFailPage /> },

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