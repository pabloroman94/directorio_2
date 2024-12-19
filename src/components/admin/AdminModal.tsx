import { useState } from 'react';
import { Input } from '../ui/Input';
import type { Professional, UserRole, UserStatus } from '../../types';

interface AdminModalProps {
  professional?: Professional;
  onClose: () => void;
  onSave: (professional: Professional) => void;
}

export default function AdminModal({ professional, onClose, onSave }: AdminModalProps) {
  const [formData, setFormData] = useState<Professional>(professional || {
    id: Date.now().toString(),
    type: 'professional',
    fullName: '',
    email: '',
    profession: '',
    company: '',
    city: '',
    phone: '',
    description: '',
    tags: [],
    image: '',
    rating: 0,
    reviews: 0,
    reviewCount: 0,
    role: 'professional',
    status: 'active',
    specialties: [],
    experience: 0,
    coverageAreas: [],
    hourlyRate: 0,
    portfolio: [],
    social: {
      linkedin: '',
      twitter: '',
      instagram: '',
      github: ''
    },
    contact: {
      email: '',
      phone: '',
      website: '',
      location: {
        address: '',
        city: '',
        country: ''
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Professional);
  };

  return (
    <>
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {professional ? 'Editar Profesional' : 'Nuevo Profesional'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Input
                      label="Nombre"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">Rol</label>
                      <select 
                        className="form-select"
                        value={formData.role}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          role: e.target.value as UserRole 
                        })}
                        required
                      >
                        <option value="professional">Profesional</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">Estado</label>
                      <select 
                        className="form-select"
                        value={formData.status}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          status: e.target.value as UserStatus 
                        })}
                        required
                      >
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <Input
                      label="Profesión"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Empresa"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Ciudad"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <Input
                      label="Etiquetas (separadas por coma)"
                      value={formData.tags.join(', ')}
                      onChange={(e) => setFormData({
                        ...formData,
                        tags: e.target.value.split(',').map(tag => tag.trim())
                      })}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button type="submit" className="btn btn-primary me-2">
                    Guardar
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
}