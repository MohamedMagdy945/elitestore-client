export interface PaginatedResult<T> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  data: T[];
}