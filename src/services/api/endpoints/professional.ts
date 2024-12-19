import { Fetcher } from '../core/fetcher';
import { Professional, ProfessionalCreateData } from '../types/professional.types';
import { ApiResponse } from '../types/api.types';

export class ProfessionalEndpoint {
  constructor(private readonly fetcher: Fetcher) {}

  async getProfessional(id: string): Promise<ApiResponse<Professional>> {
    return this.fetcher.get<ApiResponse<Professional>>(`/professionals/${id}`);
  }

  async createProfessional(data: ProfessionalCreateData): Promise<ApiResponse<Professional>> {
    return this.fetcher.post<ApiResponse<Professional>>('/professionals', data);
  }
} 