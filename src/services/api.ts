const BASE_URL = "https://fakestoreapi.in/api";

export const API_ENDPOINTS = {
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
  USERS: "/users",
  USER: (id: number) => `/users/${id}`,
  USERS_LIMIT: (limit: number) => `/users?limit=${limit}`,
  USERS_PAGE: (page: number) => `/users?page=${page}`,
  USERS_PAGINATED: (page: number, limit: number) =>
    `/users?page=${page}&limit=${limit}`,
} as const;

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};
