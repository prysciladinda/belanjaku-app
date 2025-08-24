export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
  popular?: boolean;
  rating?: number;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateProductRequest = {
  title: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
};

export type UpdateProductRequest = Partial<CreateProductRequest>;

export type Paginated<T> = {
  data: T[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type Brand = string;

export type Category = string;
