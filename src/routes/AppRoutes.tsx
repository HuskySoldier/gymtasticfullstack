import { useRoutes } from "react-router-dom";
import { HomePage } from "../pages/store/HomePage";
import { LoginPage } from "../pages/store/LoginPage";
import { ProtectedRoute } from "../components/shared/ProtectedRoute";
import { AdminLayout } from "../pages/admin/AdminLayout";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminProducts } from "../pages/admin/AdminProducts";
import { CheckoutPage } from "../pages/store/CheckoutPage";

export const AppRoutes = () => {
    const routes = useRoutes([
        // --- Rutas públicas ---
        { path: '/', element: <HomePage /> },
        { path: '/login', element: <LoginPage /> },
        // ... resto de rutas públicas ...

        // --- Rutas Protegidas de ADMIN ---
        {
          element: <ProtectedRoute requiredRole="Admin" />, // <--- PROTECCIÓN APLICADA
          children: [
            {
              path: '/admin',
              element: <AdminLayout />,
              children: [
                { index: true, element: <AdminDashboard /> },
                { path: 'productos', element: <AdminProducts /> },
                // ... resto de rutas admin ...
              ]
            }
          ]
        },

        // --- Rutas Protegidas de USUARIO (Ejemplo: Checkout, Perfil) ---
        {
            element: <ProtectedRoute requiredRole="Cliente" />, // O sin rol para permitir ambos
            children: [
                { path: '/checkout', element: <CheckoutPage /> },
                // ...
            ]
        },

        { path: '*', element: <div>404</div> }
    ]);

    return routes;
}