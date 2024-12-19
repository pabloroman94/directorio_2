import { useNavigate } from 'react-router-dom';
import ProfessionalCard from './ProfessionalCard';
import NoResults from '../layout/NoResults';
import type { Professional } from '../../types';

interface ProfessionalListProps {
  professionals: Professional[];
}

export default function ProfessionalList({ professionals }: ProfessionalListProps) {
  const navigate = useNavigate();

  if (professionals.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="professionals-list row g-4">
      {professionals.map((professional) => (
        <div key={professional.id} className="col-md-6 col-lg-4">
          <ProfessionalCard
            professional={professional}
            onClick={() => {
              // Smooth scroll to top before navigation
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => {
                navigate(`/profile/${professional.id}`);
              }, 300);
            }}
          />
        </div>
      ))}
    </div>
  );
}