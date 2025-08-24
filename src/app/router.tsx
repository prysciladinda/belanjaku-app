import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import HomePage from "../pages/Home/HomePage";
import ProductsPage from "../pages/Products/ProductsPage";
import ProductDetailPage from "../pages/Products/ProductDetailPage";
import BrandProductsPage from "../pages/Brands/BrandProductsPage";
import CategoriesPage from "../pages/Categories/CategoriesPage";
import CategoryProductsPage from "../pages/Categories/CategoryProductsPage";
import BrandsPage from "../pages/Brands/BrandsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "products", element: <ProductsPage /> },
            { path: "products/:id", element: <ProductDetailPage /> },
            { path: "brands", element: <BrandsPage /> },
            { path: "brands/:brand", element: <BrandProductsPage /> },
            { path: "categories", element: <CategoriesPage /> },
            { path: "categories/:category", element: <CategoryProductsPage /> },
        ],
    },
]);