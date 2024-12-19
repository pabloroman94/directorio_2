import { Fetcher } from '../../core/fetcher';
import { ProfessionalCreateData, ProfessionalResponse } from './professional.types';

export class ProfessionalApi {
  constructor(private readonly fetcher: Fetcher) {}

  async getProfessional(id: string): Promise<ProfessionalResponse> {
    return this.fetcher.get<ProfessionalResponse>(`/professionals/${id}`);
  }

  async createProfessional(data: ProfessionalCreateData): Promise<ProfessionalResponse> {
    return this.fetcher.post<ProfessionalResponse>('/professionals', data);
  }
} 