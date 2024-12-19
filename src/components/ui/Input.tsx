import { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export function Input({
  label,
  error,
  icon,
  ...props
}: InputProps) {
  return (
    <div className="mb-3">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      <div className="input-group">
        {icon && (
          <span className="input-group-text border-end-0 bg-white">
            {icon}
          </span>
        )}
        <input
          className={`form-control ${icon ? 'border-start-0' : ''} ${error ? 'is-invalid' : ''}`}
          {...props}
        />
      </div>
      {error && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
}