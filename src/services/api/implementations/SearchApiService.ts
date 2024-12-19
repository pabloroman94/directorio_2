import { ApiService } from '../base/ApiService';
import { ServiceProvider } from '../../../types/service';
import { professionals } from '../../../data/mock/professionals';
import { companies } from '../../../data/mock/companies';
import { createSuccessResponse, createErrorResponse } from '../utils/apiUtils';
import type { ApiResponse } from '../types/ApiResponse';

export type FilterType = 'all' | 'professional' | 'company';
export type SortOption = 'relevancia' | 'calificacion' | 'resenas' | 'experiencia' | 'nombre';

export class SearchApiService extends ApiService {
  /**
   * Busca profesionales y empresas según los criterios especificados
   * @param query - Texto de búsqueda
   * @param type - Tipo de proveedor ('all', 'professional', 'company')
   * @param neighborhood - Filtro por barrio/ubicación
   * @returns Promise con los resultados de búsqueda
   */
  async search(
    query: string,
    type: FilterType = 'all',
    neighborhood?: string
  ): Promise<ApiResponse<ServiceProvider[]>> {
    try {
      // Simular delay de red
      await this.simulateDelay();
      
      // Normalizar textos para búsqueda case-insensitive y sin acentos
      const normalize = (text: string) => 
        text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      // Obtener todos los proveedores inicialmente
      let results = [...professionals, ...companies];
      
      // Filtrar por tipo si no es 'all'
      if (type !== 'all') {
        results = results.filter(provider => provider.type === type);
      }

      // Aplicar filtro de búsqueda por texto
      if (query) {
        const searchText = normalize(query);
        results = results.filter(provider => {
          // Buscar en diferentes campos según el tipo de proveedor
          const searchableText = provider.type === 'professional' 
            ? [
                provider.fullName,
                provider.profession,
                ...provider.specialties
              ].map(normalize).join(' ')
            : [
                provider.companyName,
                ...provider.services
              ].map(normalize).join(' ');
          
          return searchableText.includes(searchText);
        });
      }

      // Filtrar por barrio/ubicación
      if (neighborhood) {
        results = results.filter(provider => 
          normalize(provider.contact.location.city)
            .includes(normalize(neighborhood))
        );
      }

      return createSuccessResponse(results);
    } catch (error) {
      return createErrorResponse({
        code: 'SEARCH_ERROR',
        message: 'Error en la búsqueda',
        status: 500
      });
    }
  }

  /**
   * Ordena una lista de proveedores según el criterio especificado
   * @param providers - Lista de proveedores a ordenar
   * @param sortBy - Criterio de ordenamiento
   * @returns Promise con la lista ordenada
   */
  async sort(
    providers: ServiceProvider[],
    sortBy: SortOption
  ): Promise<ApiResponse<ServiceProvider[]>> {
    await this.simulateDelay(200);

    const sorted = this.applySorting([...providers], sortBy);
    return createSuccessResponse(sorted);
  }

  /**
   * Aplica el ordenamiento según diferentes criterios
   * @private
   */
  private applySorting(
    providers: ServiceProvider[],
    sortBy: SortOption
  ): ServiceProvider[] {
    switch (sortBy) {
      case 'relevancia':
        // Ordenar por un score combinado de rating y número de reseñas
        return providers.sort((a, b) => {
          const scoreA = a.rating * Math.log10(a.reviewCount + 1);
          const scoreB = b.rating * Math.log10(b.reviewCount + 1);
          return scoreB - scoreA;
        });
      
      case 'calificacion':
        return providers.sort((a, b) => b.rating - a.rating);
      
      case 'resenas':
        return providers.sort((a, b) => b.reviewCount - a.reviewCount);
      
      case 'experiencia':
        return providers.sort((a, b) => {
          // Manejar diferentes tipos de experiencia según el tipo de proveedor
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
      
      case 'nombre':
        return providers.sort((a, b) => {
          const nameA = a.type === 'professional' ? a.fullName : a.companyName;
          const nameB = b.type === 'professional' ? b.fullName : b.companyName;
          return nameA.localeCompare(nameB, 'es', { sensitivity: 'base' });
        });
      
      default:
        return providers;
    }
  }
}
