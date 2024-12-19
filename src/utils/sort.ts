import type { ServiceProvider } from '../types/service';

export type SortOption = 'default' | 'rating' | 'reviews' | 'experience' | 'name';

export const sortProviders = (providers: ServiceProvider[], sortBy: SortOption): ServiceProvider[] => {
  const sorted = [...providers];

  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    
    case 'reviews':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    
    case 'experience':
      return sorted.sort((a, b) => {
        if (a.type === 'professional' && b.type === 'professional') {
          return b.experience - a.experience;
        }
        if (a.type === 'company' && b.type === 'company') {
          const yearA = a.foundedYear || 0;
          const yearB = b.foundedYear || 0;
          return yearB - yearA;
        }
        return a.type === 'professional' ? -1 : 1;
      });
    
    case 'name':
      return sorted.sort((a, b) => {
        const nameA = a.type === 'professional' ? a.fullName : a.companyName;
        const nameB = b.type === 'professional' ? b.fullName : b.companyName;
        return nameA.localeCompare(nameB);
      });
    
    default:
      return providers;
  }
};