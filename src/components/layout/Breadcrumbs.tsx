import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TRANSLATIONS } from '../../constants/translations';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  return (
    <div className="container py-3">
      <div className="d-flex align-items-center gap-3">
        <button 
          onClick={() => window.history.back()}
          className="btn btn-link text-decoration-none p-0 d-flex align-items-center gap-2"
        >
          <ArrowLeft size={20} />
          {TRANSLATIONS.BACK}
        </button>

        <nav aria-label="breadcrumb" className="ms-3">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">
                {TRANSLATIONS.HOME}
              </Link>
            </li>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              const translationKey = name.toUpperCase() as keyof typeof TRANSLATIONS;

              return (
                <li 
                  key={name} 
                  className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                  {...(isLast && { 'aria-current': 'page' })}
                >
                  {isLast ? (
                    TRANSLATIONS[translationKey] || name
                  ) : (
                    <Link to={routeTo} className="text-decoration-none">
                      {TRANSLATIONS[translationKey] || name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}