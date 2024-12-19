import { professionals } from './professionals';
import { companies } from './companies';
import type { ServiceProvider } from '../../types/service';

// Combinar todos los proveedores de servicios
export const serviceProviders: ServiceProvider[] = [
  ...professionals,
  ...companies
];

// Utilidades para filtrado
export const getProvidersByType = (type: 'professional' | 'company') => {
  return serviceProviders.filter(provider => provider.type === type);
};

export const getProviderById = (id: string) => {
  return serviceProviders.find(provider => provider.id === id);
};

export const searchProviders = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return serviceProviders.filter(provider => {
    if (provider.type === 'professional') {
      return (
        provider.fullName.toLowerCase().includes(lowercaseQuery) ||
        provider.profession.toLowerCase().includes(lowercaseQuery) ||
        provider.specialties.some(s => s.toLowerCase().includes(lowercaseQuery))
      );
    } else {
      return (
        provider.companyName.toLowerCase().includes(lowercaseQuery) ||
        provider.services.some(s => s.toLowerCase().includes(lowercaseQuery))
      );
    }
  });
};

// Exportar datos mock
export { professionals, companies };