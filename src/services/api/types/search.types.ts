export interface SearchParams {
  query: string;
  page?: number;
  limit?: number;
  filters?: Record<string, unknown>;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: string;
  // Agrega más campos según necesites
}

export type SearchResponse = SearchResult[]; 