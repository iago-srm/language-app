export interface IUseCase<P, R> {
  execute: (args: P) => Promise<R>;
}

export interface IPaginatedResponse<T> {
  data: T[];
  cursor: number;
}

export interface IPaginatedParams {
  cursor: number;
  pageSize?: number;
}
