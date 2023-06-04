interface IGetRateLimiterRes {
  card: string[];
  facets: Record<string, unknown>;
  meta: Record<string, unknown>;
  search_log_id: string;
  total_hits: number;
}

export type { IGetRateLimiterRes };
