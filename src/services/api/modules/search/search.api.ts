import { Fetcher } from '../../core/fetcher';
import { SearchParams, SearchResponse } from './search.types';

export class SearchApi {
  constructor(private readonly fetcher: Fetcher) {}

  async search(params: SearchParams): Promise<SearchResponse> {
    const { filters, ...queryParams } = params;
    return this.fetcher.get<SearchResponse>('/search', {
      ...queryParams,
      ...(filters || {})
    });
  }
} 