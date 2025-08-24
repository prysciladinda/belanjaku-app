import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, API_ENDPOINTS } from "../services/api";
import type { Product, CreateProductRequest, UpdateProductRequest, ApiResponse } from "../types";

// Query Keys
export const queryKeys = {
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (filters: any) => [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.products.details(), id] as const,
    categories: () => [...queryKeys.products.all, "categories"] as const,
    byCategory: (category: string) => [...queryKeys.products.all, "category", category] as const,
  },
  brands: {
    all: ["brands"] as const,
    lists: () => [...queryKeys.brands.all, "list"] as const,
    list: (filters: any) => [...queryKeys.brands.lists(), filters] as const,
    products: (brand: string) => [...queryKeys.brands.all, "products", brand] as const,
  },
};

// Product Hooks
export const useProducts = (limit?: number) => {
  return useQuery({
    queryKey: queryKeys.products.list({ limit }),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Product>>(
        limit ? API_ENDPOINTS.PRODUCTS_LIMIT(limit) : API_ENDPOINTS.PRODUCTS
      );
      return response;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<any>(API_ENDPOINTS.PRODUCT(id));
      
      if (response && typeof response === "object") {
        if (response.product) return response.product;
        if (response.id || response.title) return response;
        if (response.data) return response.data;
      }
      return response;
    },
    enabled: !!id,
  });
};

export const useProductsPaginated = (page: number = 1, limit: number = 50) => {
  return useQuery({
    queryKey: queryKeys.products.list({ page, limit }),
    queryFn: async () => {
      const response = await apiClient.get<any>(API_ENDPOINTS.PRODUCTS_PAGINATED(page, limit));
      return response;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: queryKeys.products.categories(),
    queryFn: async () => {
      const response = await apiClient.get<any>(API_ENDPOINTS.PRODUCTS_CATEGORIES);
      
      if (response && Array.isArray(response)) return response;
      if (response?.categories && Array.isArray(response.categories)) return response.categories;
      if (response?.data && Array.isArray(response.data)) return response.data;
      
      const productsResponse = await apiClient.get<any>(API_ENDPOINTS.PRODUCTS);
      if (productsResponse?.products && Array.isArray(productsResponse.products)) {
        const categories = [...new Set(productsResponse.products.map((product: any) => product.category))];
        return categories.filter(Boolean);
      }
      return [];
    },
  });
};

export const useProductsByCategory = (category: string, sort?: "asc" | "desc") => {
  return useQuery({
    queryKey: queryKeys.products.byCategory(category),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Product>>(
        sort
          ? API_ENDPOINTS.PRODUCTS_BY_CATEGORY_SORTED(category, sort)
          : API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category)
      );
      return response;
    },
    enabled: !!category,
  });
};

// Brand Hooks
export const useBrands = () => {
  return useQuery({
    queryKey: queryKeys.brands.lists(),
    queryFn: async () => {
      const allProducts: any[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        try {
          const response = await apiClient.get<any>(API_ENDPOINTS.PRODUCTS_PAGINATED(currentPage, 50));

          if (response.products && Array.isArray(response.products)) {
            allProducts.push(...response.products);
            if (response.products.length < 50) {
              hasMorePages = false;
            } else {
              currentPage++;
            }
          } else {
            hasMorePages = false;
          }
        } catch (error) {
          console.error("Error fetching all products for brands:", error);
          hasMorePages = false;
        }
      }

      if (allProducts.length > 0) {
        const brandMap = new Map<string, string>();
        allProducts.forEach((product: any) => {
          if (product.brand) {
            const normalizedBrand = product.brand.trim().toLowerCase();
            const originalBrand = product.brand.trim();
            if (!brandMap.has(normalizedBrand)) {
              brandMap.set(normalizedBrand, originalBrand);
            }
          }
        });
        const brands = Array.from(brandMap.values()).sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );
        return brands;
      }
      return [];
    },
  });
};

export const useProductsByBrand = (brand: string) => {
  return useQuery({
    queryKey: queryKeys.brands.products(brand),
    queryFn: async () => {
      const allProducts: any[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        try {
          const response = await apiClient.get<any>(API_ENDPOINTS.PRODUCTS_PAGINATED(currentPage, 50));

          if (response.products && Array.isArray(response.products)) {
            const brandProducts = response.products.filter(
              (product: any) => product.brand?.trim().toLowerCase() === brand.trim().toLowerCase()
            );
            allProducts.push(...brandProducts);

            if (response.products.length < 50) {
              hasMorePages = false;
            } else {
              currentPage++;
            }
          } else {
            hasMorePages = false;
          }
        } catch (error) {
          console.error("Error fetching products for brand:", error);
          hasMorePages = false;
        }
      }

      return {
        status: "SUCCESS",
        message: `Products for brand: ${brand}`,
        products: allProducts,
        totalFound: allProducts.length,
      };
    },
    enabled: !!brand,
  });
};

// Mutations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductRequest) => apiClient.post<Product>(API_ENDPOINTS.PRODUCTS, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductRequest }) =>
      apiClient.put<Product>(API_ENDPOINTS.PRODUCT(id), data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiClient.delete<{ success: boolean }>(API_ENDPOINTS.PRODUCT(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
};
