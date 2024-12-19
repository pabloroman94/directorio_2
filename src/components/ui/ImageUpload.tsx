interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (file: File) => void;
  required?: boolean;
}

export function ImageUpload({ label, value, onChange, required }: ImageUploadProps) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      {value && (
        <img 
          src={value} 
          alt={label} 
          className="d-block mb-2" 
          style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
        />
      )}
      <input
        type="file"
        className="form-control"
        onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
        required={required}
        accept="image/*"
      />
    </div>
  );
}