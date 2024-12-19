import { FileDown } from 'lucide-react';
import type { Resource } from '../../../types/service';
import './DownloadResume.css';

interface DownloadResumeProps {
  resources?: Resource[];
}

// Exportación nombrada
export function DownloadResume({ resources = [] }: DownloadResumeProps) {
  if (resources.length === 0) return null;

  return (
    <div className="download-resume">
      <h6 className="download-title">Documentos Disponibles</h6>
      <div className="resources-list">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            download
            className="resource-link"
          >
            <FileDown size={18} />
            {resource.title}
          </a>
        ))}
      </div>
    </div>
  );
}

// Exportación por defecto opcional (quítala si no la necesitas)
export default DownloadResume;
