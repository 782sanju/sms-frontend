import { Navigate } from 'react-router-dom';
import authService from '@/services/api/auth.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = authService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
} 