import { PaginatedResponse } from '../../core/types';
import { QueryParams } from '../../core/fetcher';

export interface SearchParams extends QueryParams {
  query: string;
  page?: number;
  limit?: number;
  filters: Record<string, string | number | boolean>;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: string;
}

export type SearchResponse = PaginatedResponse<SearchResult>; 