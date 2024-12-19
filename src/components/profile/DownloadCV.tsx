import { FileDown } from 'lucide-react';
import type { ProfessionalProfile as Professional } from '../../types/profile';

interface DownloadCVProps {
  professional: Professional;
}

export function DownloadCV({ professional }: DownloadCVProps) {
  const generateCV = () => {
    const cvContent = `
CURRICULUM VITAE

${professional.fullName}
${professional.profession}

Contacto:
${professional.contact.email}
${professional.contact.phone}
${professional.contact.city}

Especialidades:
${professional.specialties.join(', ')}

Experiencia:
${professional.experience} años

Tarifa por hora:
$${professional.hourlyRate}

Calificación:
${professional.rating}/5 basado en ${professional.reviewCount} reseñas
    `.trim();

    // Create Blob and download
    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV-${professional.fullName.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={generateCV}
      className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
    >
      <FileDown size={20} />
      Descargar CV
    </button>
  );
}