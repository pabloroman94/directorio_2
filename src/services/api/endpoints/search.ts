import { Fetcher } from '../core/fetcher';
import { SearchResponse, SearchParams } from '../types/search.types';
import { ApiResponse } from '../types/api.types';

export class SearchEndpoint {
  constructor(private readonly fetcher: Fetcher) {}

  async search(params: SearchParams): Promise<ApiResponse<SearchResponse>> {
    return this.fetcher.get<ApiResponse<SearchResponse>>('/search', params);
  }
} 