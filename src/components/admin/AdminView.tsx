import { useState } from 'react';
import { Trash2, Edit, Plus, Search, UserCheck, UserX } from 'lucide-react';
import type { Professional } from '../../types';

interface AdminViewProps {
  professionals: Professional[];
  onDelete: (id: string) => void;
  onEdit: (professional: Professional) => void;
  onAdd: () => void;
  onToggleStatus: (professional: Professional) => void;
  isLoading?: boolean;
}

export default function AdminView({ 
  professionals, 
  onDelete, 
  onEdit, 
  onAdd,
  onToggleStatus,
  isLoading 
}: AdminViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfessionals = professionals.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Administración de Usuarios</h3>
            <button 
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={onAdd}
              disabled={isLoading}
            >
              <Plus size={18} />
              Agregar Usuario
            </button>
          </div>

          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">
                <Search size={18} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Profesión</th>
                  <th>Ciudad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfessionals.map((professional) => (
                  <tr 
                    key={professional.id} 
                    className={professional.status === 'inactive' ? 'table-secondary' : ''}
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={professional.image}
                          alt={professional.fullName}
                          className="rounded-circle me-2"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                        {professional.fullName}
                      </div>
                    </td>
                    <td>{professional.email}</td>
                    <td>
                      <span className={`badge bg-${professional.role === 'admin' ? 'danger' : 'primary'}`}>
                        {professional.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge bg-${professional.status === 'active' ? 'success' : 'secondary'}`}>
                        {professional.status}
                      </span>
                    </td>
                    <td>{professional.profession}</td>
                    <td>{professional.city}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => onEdit(professional)}
                          disabled={isLoading}
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className={`btn btn-outline-${professional.status === 'active' ? 'warning' : 'success'} btn-sm`}
                          onClick={() => onToggleStatus(professional)}
                          disabled={isLoading}
                          title={professional.status === 'active' ? 'Desactivar' : 'Activar'}
                        >
                          {professional.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => onDelete(professional.id)}
                          disabled={isLoading}
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}