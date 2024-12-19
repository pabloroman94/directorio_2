import { Fragment } from 'react';

interface RadioOption {
  id: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RadioGroup({ name, options, value, onChange, className = '' }: RadioGroupProps) {
  return (
    <div className={`btn-group ${className}`} role="group">
      {options.map(option => (
        <Fragment key={option.id}>
          <input
            type="radio"
            className="btn-check"
            name={name}
            id={option.id}
            value={option.id}
            checked={value === option.id}
            onChange={(e) => onChange(e.target.value)}
          />
          <label className="btn btn-outline-primary" htmlFor={option.id}>
            {option.label}
          </label>
        </Fragment>
      ))}
    </div>
  );
}