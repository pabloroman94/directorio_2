import { ApiResponse } from '../../core/types';

export interface Company {
  id: string;
  name: string;
  industry: string;
}

export interface CompanyCreateData {
  name: string;
  industry: string;
}

export type CompanyResponse = ApiResponse<Company>; 