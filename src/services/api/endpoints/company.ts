import { Fetcher } from '../core/fetcher';
import { Company, CompanyCreateData } from '../../types/company.types';
import { ApiResponse } from '../../types/api.types';

export class CompanyEndpoint {
  constructor(private readonly fetcher: Fetcher) {}

  async getCompany(id: string): Promise<ApiResponse<Company>> {
    return this.fetcher.get<ApiResponse<Company>>(`/companies/${id}`);
  }

  async createCompany(data: CompanyCreateData): Promise<ApiResponse<Company>> {
    return this.fetcher.post<ApiResponse<Company>>('/companies', data);
  }
} 