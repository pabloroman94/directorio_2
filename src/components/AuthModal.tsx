import { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';

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
  isLogin = true 
}: AuthModalProps) {
  const [isLoginView, setIsLoginView] = useState(isLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLoginView) {
        await onLogin(email, password);
      } else {
        await onRegister(name, email, password);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <>
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isLoginView ? 'Login' : 'Register'}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {!isLoginView && (
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <User size={20} className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required={!isLoginView}
                      />
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Mail size={20} className="text-muted" />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Lock size={20} className="text-muted" />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {isLoginView ? 'Login' : 'Register'}
                </button>
              </form>

              <div className="text-center mt-3">
                <button
                  onClick={() => setIsLoginView(!isLoginView)}
                  className="btn btn-link text-decoration-none"
                >
                  {isLoginView
                    ? "Don't have an account? Register"
                    : 'Already have an account? Login'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
}