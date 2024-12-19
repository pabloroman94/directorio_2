import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../LoadingSpinner';
import { AUTH_ERRORS } from '../../constants/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ message: AUTH_ERRORS.LOGIN_REQUIRED }} />;
  }

  if (requireAdmin && !user?.isAdmin) {
    return <Navigate to="/" state={{ message: AUTH_ERRORS.ADMIN_REQUIRED }} />;
  }

  return <>{children}</>;
}