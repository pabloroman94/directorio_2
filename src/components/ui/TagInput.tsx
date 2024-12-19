import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface TagInputProps {
  label: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}

export function TagInput({ 
  label, 
  value = [], 
  onChange, 
  placeholder, 
  required,
  disabled,
  icon
}: TagInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className={`form-control d-flex flex-wrap gap-2 min-height-auto p-2 ${disabled ? 'bg-light' : ''}`}>
        {icon && (
          <span className="text-muted">
            {icon}
          </span>
        )}
        {value.map(tag => (
          <span key={tag} className="badge bg-primary d-flex align-items-center gap-1">
            {tag}
            {!disabled && (
              <button
                type="button"
                className="btn btn-link btn-sm p-0 text-white"
                onClick={() => removeTag(tag)}
              >
                <X size={14} />
              </button>
            )}
          </span>
        ))}
        {!disabled && (
          <input
            type="text"
            className="border-0 flex-grow-1 p-1 bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            style={{ outline: 'none' }}
            required={required && value.length === 0}
          />
        )}
      </div>
    </div>
  );
}