// Componente de spinner de carga con soporte para pantalla completa
import { TRANSLATIONS } from '../constants/translations';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export default function LoadingSpinner({ 
  fullScreen, 
  size = 'md',
  message = TRANSLATIONS.LOADING 
}: LoadingSpinnerProps) {
  const spinnerSizes = {
    sm: '',
    md: 'spinner-border-sm',
    lg: ''
  };

  const spinner = (
    <div className="text-center">
      <div className={`spinner-border text-primary mb-2 ${spinnerSizes[size]}`} role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <div className="text-muted">{message}</div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loading-overlay">
        {spinner}
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center p-4">
      {spinner}
    </div>
  );
}