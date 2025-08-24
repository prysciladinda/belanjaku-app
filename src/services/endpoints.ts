export const API_ENDPOINTS = {
  // Products
  PRODUCTS: "/products",
  PRODUCT: (id: number) => `/products/${id}`,
  PRODUCTS_LIMIT: (limit: number) => `/products?limit=${limit}`,
  PRODUCTS_PAGE: (page: number) => `/products?page=${page}`,
  PRODUCTS_PAGINATED: (page: number, limit: number) =>
    `/products?page=${page}&limit=${limit}`,
  PRODUCTS_CATEGORIES: "/products/category",
  PRODUCTS_BY_CATEGORY: (category: string) =>
    `/products/category?type=${category}`,
  PRODUCTS_BY_CATEGORY_SORTED: (
    category: string,
    sort: "asc" | "desc"
  ) => `/products/category?type=${category}&sort=${sort}`,

  // Users
  USERS: "/users",
  USER: (id: number) => `/users/${id}`,
  USERS_LIMIT: (limit: number) => `/users?limit=${limit}`,
  USERS_PAGE: (page: number) => `/users?page=${page}`,
  USERS_PAGINATED: (page: number, limit: number) =>
    `/users?page=${page}&limit=${limit}`,
} as const;
