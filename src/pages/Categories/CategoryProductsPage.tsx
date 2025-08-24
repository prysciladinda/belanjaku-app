import { useParams, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import ProductCard from "../../components/ui/ProductCard";
import { Skeleton } from "../../components/ui/Skeleton";
import { Button } from "../../components/ui/Button";
import { useProductsByCategory } from "../../hooks/api";

export default function CategoryProductsPage() {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const { data: response, isLoading, error } = useProductsByCategory(category || "");

    const products = response?.products || [];
    const totalProducts = products.length;

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/categories');
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
                <div className="text-center text-red-500">
                    Error loading products for {category}: {error.message}
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
                <h1 className="text-2xl font-semibold">
                    {category ? `${category} Products` : "Category Products"}
                </h1>
            </div>

            {totalProducts > 0 ? (
                <>
                    <p className="text-gray-600 mb-6">{totalProducts} products found</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500">No products found for {category}.</p>
            )}
        </Container>
    );
}