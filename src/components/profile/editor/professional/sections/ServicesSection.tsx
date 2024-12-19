import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '../../../../ui/Input';
import type { ProfessionalProfile } from '../../../../../types/profile';

interface ServicesSectionProps {
  services: ProfessionalProfile['services'];
  onUpdate: (data: Partial<ProfessionalProfile>) => Promise<void>;
  isSaving: boolean;
}

export default function ServicesSection({
  services = [],
  onUpdate,
  isSaving
}: ServicesSectionProps) {
  const [items, setItems] = useState(services);

  const handleAdd = () => {
    setItems([
      ...items,
      { name: '', description: '', price: 0 }
    ]);
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof typeof items[0], value: string | number) => {
    setItems(items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate({ services: items });
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
          Agregar Servicio
        </button>
      </div>

      {items.map((item, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <h6 className="card-title mb-0">Servicio {index + 1}</h6>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleRemove(index)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <Input
                  label="Nombre del Servicio"
                  value={item.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Precio por Hora ($)"
                  type="number"
                  value={item.price.toString()}
                  onChange={(e) => handleChange(index, 'price', parseFloat(e.target.value))}
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