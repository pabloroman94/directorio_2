import { Link } from 'react-router-dom';
import { UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Logo from './Logo';
import { TRANSLATIONS } from '../../constants/translations';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="sticky-top bg-white border-bottom">
      <div className="container py-2">
        <div className="d-flex justify-content-between align-items-center">
          <Logo />
          
          {isAuthenticated && user ? (
            <div className="dropdown">
              <button 
                className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <UserCircle size={20} />
                {user.name} {user.isAdmin && '(Admin)'}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {user.isAdmin && (
                  <>
                    <li>
                      <Link to="/admin" className="dropdown-item">
                        {TRANSLATIONS.ADMIN_PANEL}
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                  </>
                )}
                <li>
                  <Link to="/profile" className="dropdown-item">
                    {TRANSLATIONS.MY_PROFILE}
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item text-danger d-flex align-items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    {TRANSLATIONS.LOGOUT}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-primary">
                {TRANSLATIONS.LOGIN}
              </Link>
              <Link to="/register" className="btn btn-primary">
                {TRANSLATIONS.REGISTER}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}