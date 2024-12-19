import { ApiService } from '../base/ApiService';
import { CompanyService } from '../../../types/service';
import { companies } from '../../../data/mock/companies';
import { createSuccessResponse, createPaginatedResponse } from '../utils/apiUtils';
import type { ApiResponse, PaginatedResponse } from '../types/ApiResponse';

export class CompanyApiService extends ApiService {
  async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<CompanyService>> {
    await this.simulateDelay();
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = companies.slice(start, end);
    
    return createPaginatedResponse(paginatedData, page, limit, companies.length);
  }

  async getById(id: string): Promise<ApiResponse<CompanyService | null>> {
    await this.simulateDelay(300);
    this.validateId(id);

    const company = companies.find(c => c.id === id);
    return createSuccessResponse(company || null);
  }

  async create(data: Omit<CompanyService, 'id'>): Promise<ApiResponse<CompanyService>> {
    await this.simulateDelay();
    this.validateRequired(data, [
      'type', 'companyName', 'services', 
      'rating', 'reviewCount', 'coverageAreas',
      'contact'
    ]);

    const newCompany = {
      id: Date.now().toString(),
      ...data
    };

    return createSuccessResponse(newCompany);
  }

  async update(id: string, data: Partial<CompanyService>): Promise<ApiResponse<CompanyService>> {
    await this.simulateDelay();
    this.validateId(id);

    const company = companies.find(c => c.id === id);
    if (!company) {
      this.handleError('Company not found');
    }

    const updated = { ...company!, ...data };
    return createSuccessResponse(updated);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    await this.simulateDelay();
    this.validateId(id);

    const company = companies.find(c => c.id === id);
    if (!company) {
      this.handleError('Company not found');
    }

    return createSuccessResponse(undefined);
  }
}