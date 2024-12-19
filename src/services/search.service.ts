import { ServiceProvider } from '../types/service';
import { professionals } from '../data/mock/professionals';
import { companies } from '../data/mock/companies';

export type FilterType = 'all' | 'professional' | 'company';
export type SortOption = 'rating' | 'reviews' | 'experience' | 'name';

export const SearchService = {
  async search(query: string, type: FilterType, neighborhood?: string): Promise<ServiceProvider[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Get initial data based on type
    let results: ServiceProvider[] = [];
    if (type === 'all') {
      results = [...professionals, ...companies];
    } else if (type === 'professional') {
      results = [...professionals];
    } else {
      results = [...companies];
    }

    // Filter by text search
    if (query.trim()) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(provider => {
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
    }

    // Filter by location
    if (neighborhood) {
      results = results.filter(provider => 
        provider.coverageAreas.some(area => 
          area.toLowerCase().includes(neighborhood.toLowerCase())
        )
      );
    }

    return results;
  },

  async sort(providers: ServiceProvider[], sortBy: SortOption): Promise<ServiceProvider[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

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
  }
};