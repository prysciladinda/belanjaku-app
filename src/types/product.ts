export type Product = {
  id: number;
  title: string;
  image: string; // API menggunakan 'image' bukan 'images'
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
  status: string;
  message: string;
  products: T[];
};

// Handle different API response structures
export type ProductsResponse = Product[] | ApiResponse<Product>;

// Single product response
export type SingleProductResponse =
  | Product
  | { product: Product }
  | { data: Product };
