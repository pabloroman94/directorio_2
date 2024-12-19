import { ApiService } from '../base/ApiService';
import { ProfessionalService } from '../../../types/service';
import { professionals } from '../../../data/mock/professionals';
import { createSuccessResponse, createPaginatedResponse } from '../utils/apiUtils';
import type { ApiResponse, PaginatedResponse } from '../types/ApiResponse';

export class ProfessionalApiService extends ApiService {
  async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<ProfessionalService>> {
    await this.simulateDelay();
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = professionals.slice(start, end);
    
    return createPaginatedResponse(paginatedData, page, limit, professionals.length);
  }

  async getById(id: string): Promise<ApiResponse<ProfessionalService | null>> {
    await this.simulateDelay(300);
    this.validateId(id);

    const professional = professionals.find(p => p.id === id);
    return createSuccessResponse(professional || null);
  }

  async create(data: Omit<ProfessionalService, 'id'>): Promise<ApiResponse<ProfessionalService>> {
    await this.simulateDelay();
    this.validateRequired(data, [
      'type', 'fullName', 'profession', 'specialties', 
      'experience', 'rating', 'reviewCount', 'coverageAreas',
      'contact'
    ]);

    const newProfessional = {
      id: Date.now().toString(),
      ...data
    };

    return createSuccessResponse(newProfessional);
  }

  async update(id: string, data: Partial<ProfessionalService>): Promise<ApiResponse<ProfessionalService>> {
    await this.simulateDelay();
    this.validateId(id);

    const professional = professionals.find(p => p.id === id);
    if (!professional) {
      this.handleError('Professional not found');
    }

    const updated = { ...professional!, ...data };
    return createSuccessResponse(updated);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    await this.simulateDelay();
    this.validateId(id);

    const professional = professionals.find(p => p.id === id);
    if (!professional) {
      this.handleError('Professional not found');
    }

    return createSuccessResponse(undefined);
  }
}