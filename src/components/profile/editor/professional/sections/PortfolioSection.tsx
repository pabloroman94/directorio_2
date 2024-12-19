import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '../../../../ui/Input';
import type { ProfessionalProfile } from '../../../../../types/profile';

interface PortfolioSectionProps {
  portfolio: ProfessionalProfile['portfolio'];
  onUpdate: (data: Partial<ProfessionalProfile>) => Promise<void>;
  isSaving: boolean;
}

export default function PortfolioSection({
  portfolio = [],
  onUpdate,
  isSaving
}: PortfolioSectionProps) {
  const [items, setItems] = useState(portfolio);

  const handleAdd = () => {
    setItems([
      ...items,
      { title: '', description: '', imageUrl: '' }
    ]);
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof typeof items[0], value: string) => {
    setItems(items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate({ portfolio: items });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <button
          type="button"
          className="btn btn-outline-primary d-flex align-items-center gap-2"
          onClick={handleAdd}
        >
          <Plus size={20} />
          Agregar Proyecto
        </button>
      </div>

      {items.map((item, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <h6 className="card-title mb-0">Proyecto {index + 1}</h6>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleRemove(index)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="row g-3">
              <div className="col-12">
                <Input
                  label="Título"
                  value={item.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  required
                />
              </div>
              <div className="col-12">
                <Input
                  label="Descripción"
                  value={item.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  required
                />
              </div>
              <div className="col-12">
                <Input
                  label="URL de la Imagen"
                  value={item.imageUrl}
                  onChange={(e) => handleChange(index, 'imageUrl', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSaving}
        >
          {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      )}
    </form>
  );
}