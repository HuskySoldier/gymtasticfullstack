import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Props {
  requiredRole?: 'Admin' | 'Cliente';
}

export const ProtectedRoute = ({ requiredRole }: Props) => {
  const { user, isAuthenticated } = useAuth();

  // 1. Si no está logueado, al login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si requiere un rol específico y no lo tiene, al home (o página de acceso denegado)
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // 3. Si pasa, renderiza el contenido (Outlet)
  return <Outlet />;
};