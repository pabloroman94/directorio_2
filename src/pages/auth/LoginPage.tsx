import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/ui/Input';
import LoadingSpinner from '../../components/LoadingSpinner';
import { validateEmail, validatePassword } from '../../utils/validation';
import { AUTH_ERRORS } from '../../constants/auth';
import { TRANSLATIONS } from '../../constants/translations';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isLoading, error: authError, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/profile';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Mostrar mensaje de redirección si existe
  useEffect(() => {
    const message = location.state?.message;
    if (message) {
      setError(message);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!validateEmail(email)) {
      newErrors.email = AUTH_ERRORS.INVALID_EMAIL;
    }
    if (!validatePassword(password)) {
      newErrors.password = AUTH_ERRORS.INVALID_PASSWORD;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    setError(null);
    setErrors({});
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">{TRANSLATIONS.LOGIN}</h2>
              
              {(error || authError) && (
                <div className="alert alert-danger" role="alert">
                  {error || authError}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <Input
                  label={TRANSLATIONS.EMAIL}
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="admin@admin.com"
                  icon={<Mail size={20} />}
                  error={errors.email}
                  required
                />

                <Input
                  label={TRANSLATIONS.PASSWORD}
                  type="password"
                  value={password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="••••••••"
                  icon={<Lock size={20} />}
                  error={errors.password}
                  required
                />

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {TRANSLATIONS.LOADING}
                    </>
                  ) : (
                    TRANSLATIONS.LOGIN
                  )}
                </button>

                <p className="text-center mb-0">
                  {TRANSLATIONS.DONT_HAVE_ACCOUNT}{' '}
                  <Link to="/register" className="text-decoration-none">
                    {TRANSLATIONS.REGISTER}
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Credenciales de prueba */}
          <div className="mt-4 text-center">
            <p className="text-muted mb-2">Credenciales de prueba:</p>
            <code className="d-block mb-1">Email: admin@admin.com</code>
            <code className="d-block">Password: admin123</code>
          </div>
        </div>
      </div>
    </div>
  );
}