import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { 
  HomePage,
  ProfilePage,
  UserProfilePage,
  AdminPage,
  LoginPage,
  RegisterPage 
} from '../pages';
import { ProtectedRoute } from '../components/auth';
import { useAuth } from '../hooks/useAuth';

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="admin" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="login" 
          element={
            isAuthenticated ? <UserProfilePage /> : <LoginPage />
          } 
        />
        <Route 
          path="register" 
          element={
            isAuthenticated ? <UserProfilePage /> : <RegisterPage />
          } 
        />
      </Route>
    </Routes>
  );
}