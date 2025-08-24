export type Brand = {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string;
};
export type Paginated<T> = {
  data: T[];
  page: number;
  perPage: number;
  total: number;
};
