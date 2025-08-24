import { useParams, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import ProductCard from "../../components/ui/ProductCard";
import { Skeleton } from "../../components/ui/Skeleton";
import { Button } from "../../components/ui/Button";
import { useProductsByBrand } from "../../hooks/api";

export default function BrandProductsPage() {
    const { brand } = useParams<{ brand: string }>();
    const navigate = useNavigate();
    const { data: response, isLoading, error } = useProductsByBrand(brand || "");

    const products = response?.products || [];

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/brands');
        }
    };

    if (isLoading) {
        return (
            <Container className="py-10">
                <div className="mb-6">
                    <button
                        onClick={handleBack}
                        className="text-brand hover:underline flex items-center gap-1"
                    >
                        ← Back
                    </button>
                </div>
                <h1 className="text-2xl font-semibold mb-6">Loading...</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <Skeleton key={i} className="h-64" />
                    ))}
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-10">
                <div className="mb-6">
                    <button
                        onClick={handleBack}
                        className="text-brand hover:underline flex items-center gap-1"
                    >
                        ← Back
                    </button>
                </div>
                <div className="text-center text-red-500">
                    Error loading products: {error.message}
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-10">
            <div className="mb-6">
                <button
                    onClick={handleBack}
                    className="text-brand hover:underline flex items-center gap-1"
                >
                    ← Back
                </button>
            </div>

            <div className="mb-6">
                <h1 className="text-3xl font-semibold mb-2">
                    {brand?.charAt(0).toUpperCase() + brand?.slice(1)} Products
                </h1>
                <p className="text-gray-600">
                    {products.length} product{products.length !== 1 ? 's' : ''} found
                </p>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={(product) => {
                                console.log('Added to cart:', product);
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-10">
                    <h2 className="text-xl font-semibold mb-2">No products found</h2>
                    <p>No products available for this brand.</p>
                </div>
            )}
        </Container>
    );
}