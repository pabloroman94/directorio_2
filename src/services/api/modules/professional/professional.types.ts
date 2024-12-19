import { ApiResponse } from '../../core/types';

export interface Professional {
  id: string;
  name: string;
  profession: string;
}

export interface ProfessionalCreateData {
  name: string;
  profession: string;
}

export type ProfessionalResponse = ApiResponse<Professional>; 