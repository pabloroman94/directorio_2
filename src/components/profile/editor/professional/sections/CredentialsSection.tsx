import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '../../../../ui/Input';
import type { ProfessionalProfile } from '../../../../../types/profile';

interface CredentialsSectionProps {
  credentials: ProfessionalProfile['credentials'];
  onUpdate: (data: Partial<ProfessionalProfile>) => Promise<void>;
  isSaving: boolean;
}

export default function CredentialsSection({
  credentials,
  onUpdate,
  isSaving
}: CredentialsSectionProps) {
  const [education, setEducation] = useState(credentials.education);
  const [certifications, setCertifications] = useState(credentials.certifications);

  const handleAddEducation = () => {
    setEducation([
      ...education,
      { degree: '', institution: '', year: new Date().getFullYear() }
    ]);
  };

  const handleAddCertification = () => {
    setCertifications([
      ...certifications,
      { name: '', issuer: '', year: new Date().getFullYear() }
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleRemoveCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate({
      credentials: {
        education,
        certifications
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h5>Educación</h5>
        <button
          type="button"
          className="btn btn-outline-primary d-flex align-items-center gap-2"
          onClick={handleAddEducation}
        >
          <Plus size={20} />
          Agregar Educación
        </button>

        {education.map((item, index) => (
          <div key={index} className="card mt-3">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h6 className="card-title mb-0">Educación {index + 1}</h6>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemoveEducation(index)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <Input
                    label="Título"
                    value={item.degree}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index] = { ...item, degree: e.target.value };
                      setEducation(newEducation);
                    }}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="Institución"
                    value={item.institution}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index] = { ...item, institution: e.target.value };
                      setEducation(newEducation);
                    }}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="Año"
                    type="number"
                    value={item.year.toString()}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index] = { ...item, year: parseInt(e.target.value) };
                      setEducation(newEducation);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h5>Certificaciones</h5>
        <button
          type="button"
          className="btn btn-outline-primary d-flex align-items-center gap-2"
          onClick={handleAddCertification}
        >
          <Plus size={20} />
          Agregar Certificación
        </button>

        {certifications.map((item, index) => (
          <div key={index} className="card mt-3">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h6 className="card-title mb-0">Certificación {index + 1}</h6>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemoveCertification(index)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <Input
                    label="Nombre"
                    value={item.name}
                    onChange={(e) => {
                      const newCertifications = [...certifications];
                      newCertifications[index] = { ...item, name: e.target.value };
                      setCertifications(newCertifications);
                    }}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="Entidad Emisora"
                    value={item.issuer}
                    onChange={(e) => {
                      const newCertifications = [...certifications];
                      newCertifications[index] = { ...item, issuer: e.target.value };
                      setCertifications(newCertifications);
                    }}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="Año"
                    type="number"
                    value={item.year.toString()}
                    onChange={(e) => {
                      const newCertifications = [...certifications];
                      newCertifications[index] = { ...item, year: parseInt(e.target.value) };
                      setCertifications(newCertifications);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSaving}
      >
        {isSaving ? 'Guardando...' : 'Guardar Cambios'}
      </button>
    </form>
  );
}