import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  isLoading,
  icon,
  fullWidth,
  className = '',
  ...props
}: ButtonProps) {
  const baseClass = 'btn';
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline-primary',
  }[variant];

  const widthClass = fullWidth ? 'w-100' : '';
  const classes = [baseClass, variantClass, widthClass, className].filter(Boolean).join(' ');

  return (
    <button 
      className={classes} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="spinner-border spinner-border-sm me-2" role="status" />
      ) : icon ? (
        <span className="me-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}