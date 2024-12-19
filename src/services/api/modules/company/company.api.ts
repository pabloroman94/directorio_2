import { Fetcher } from '../../core/fetcher';
import { CompanyCreateData, CompanyResponse } from './company.types';

export class CompanyApi {
  constructor(private readonly fetcher: Fetcher) {}

  async getCompany(id: string): Promise<CompanyResponse> {
    return this.fetcher.get<CompanyResponse>(`/companies/${id}`);
  }

  async createCompany(data: CompanyCreateData): Promise<CompanyResponse> {
    return this.fetcher.post<CompanyResponse>('/companies', data);
  }
} 