import { useState } from 'react';
import AuthForm from './AuthForm';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
  isLogin?: boolean;
}

export default function AuthModal({
  onClose,
  onLogin,
  onRegister,
  isLogin: initialIsLogin = true
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(initialIsLogin);

  const handleSubmit = (data: { name?: string; email: string; password: string }) => {
    if (isLogin) {
      onLogin(data.email, data.password);
    } else {
      onRegister(data.name!, data.email, data.password);
    }
  };

  return (
    <>
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isLogin ? TRANSLATIONS.LOGIN : TRANSLATIONS.REGISTER}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <AuthForm
                isLogin={isLogin}
                onSubmit={handleSubmit}
                onToggleMode={() => setIsLogin(!isLogin)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
}