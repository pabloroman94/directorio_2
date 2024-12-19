import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegistrationTypeSelector } from '../../components/registration/RegistrationTypeSelector';
import { ProfessionalForm } from '../../components/registration/forms/ProfessionalForm';
import { CompanyForm } from '../../components/registration/forms/CompanyForm';
import type { RegistrationType, RegistrationData } from '../../types/registration';

export default function RegisterPage() {
  const [type, setType] = useState<RegistrationType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: RegistrationData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Aquí iría la lógica de registro
      console.log('Registrando:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular API call
    } catch (err) {
      setError('Error al procesar el registro');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Registro</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {!type ? (
                <>
                  <h5 className="text-center mb-4">Selecciona el tipo de cuenta</h5>
                  <RegistrationTypeSelector
                    selectedType={type}
                    onSelect={setType}
                  />
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <button
                      className="btn btn-link text-decoration-none p-0"
                      onClick={() => setType(null)}
                    >
                      ← Volver a selección de tipo
                    </button>
                  </div>

                  {type === 'professional' ? (
                    <ProfessionalForm
                      onSubmit={handleSubmit}
                      isLoading={isLoading}
                    />
                  ) : (
                    <CompanyForm
                      onSubmit={handleSubmit}
                      isLoading={isLoading}
                    />
                  )}
                </>
              )}

              <div className="text-center mt-4">
                <p className="mb-0">
                  ¿Ya tienes una cuenta?{' '}
                  <Link to="/login" className="text-decoration-none">
                    Iniciar Sesión
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}