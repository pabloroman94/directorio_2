import { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { validateEmail, validatePassword, validateName } from '../../utils/validation';
import { AUTH_ERRORS } from '../../constants';
import { TRANSLATIONS } from '../../constants/translations';

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (data: { name?: string; email: string; password: string }) => void;
  onToggleMode: () => void;
}

export default function AuthForm({ isLogin, onSubmit, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!validateEmail(email)) {
      newErrors.email = AUTH_ERRORS.INVALID_EMAIL;
    }
    if (!validatePassword(password)) {
      newErrors.password = AUTH_ERRORS.INVALID_PASSWORD;
    }
    if (!isLogin && !validateName(name)) {
      newErrors.name = AUTH_ERRORS.INVALID_NAME;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(isLogin ? { email, password } : { name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          icon={<User size={20} />}
          error={errors.name}
          required
        />
      )}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        icon={<Mail size={20} />}
        error={errors.email}
        required
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        icon={<Lock size={20} />}
        error={errors.password}
        required
      />

      <Button type="submit" variant="primary" fullWidth>
        {isLogin ? TRANSLATIONS.LOGIN : TRANSLATIONS.REGISTER}
      </Button>

      <div className="text-center mt-3">
        <Button
          variant="outline"
          onClick={onToggleMode}
          type="button"
        >
          {isLogin
            ? TRANSLATIONS.DONT_HAVE_ACCOUNT
            : TRANSLATIONS.ALREADY_HAVE_ACCOUNT}
        </Button>
      </div>
    </form>
  );
}