import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProviderById } from '../data/mock';
import { ServiceProfileView } from '../components/profile/ServiceProfileView';
import LoadingSpinner from '../components/LoadingSpinner';
import type { ServiceProvider } from '../types/service';

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);
      try {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));
        const found = getProviderById(id!);
        
        if (found) {
          setProvider(found);
        } else {
          setError('Proveedor no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el perfil');
        console.error('Error fetching provider:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error || !provider) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error</h4>
          <p className="mb-0">{error || 'No se pudo encontrar el perfil solicitado'}</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return <ServiceProfileView provider={provider} />;
}