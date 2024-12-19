import type { ServiceProvider } from '../types/service';

export const getUniqueSearchSuggestions = (providers: ServiceProvider[]): string[] => {
  const suggestions = new Set<string>();
  
  providers.forEach(provider => {
    if (provider.type === 'professional') {
      provider.specialties.forEach(tag => suggestions.add(tag));
      suggestions.add(provider.profession);
    } else {
      provider.services.forEach(tag => suggestions.add(tag));
    }
  });
  
  return Array.from(suggestions);
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};