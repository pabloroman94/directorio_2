import { ReactNode } from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  icon?: ReactNode;
}

export function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  icon
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-2.5">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
}