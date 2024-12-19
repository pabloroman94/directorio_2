import { ApiResponse } from '../../core/types';

export interface Profile {
  id: string;
  name: string;
  email: string;
}

export interface ProfileUpdateData {
  name?: string;
  email?: string;
}

export type ProfileResponse = ApiResponse<Profile>; 