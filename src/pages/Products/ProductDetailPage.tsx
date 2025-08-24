import { useParams, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useProduct } from "../../hooks/api";
import { Skeleton } from "../../components/ui/Skeleton";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const productId = id ? parseInt(id) : 0;
    const navigate = useNavigate();

    const { data: product, isLoading, error } = useProduct(productId);

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/products');
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
                <div className="grid md:grid-cols-2 gap-8">
                    <Skeleton className="aspect-square" />
                    <div className="space-y-4">
                        <Skeleton className="h-8" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-6" />
                        <Skeleton className="h-12" />
                    </div>
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
                    Error loading product: {error.message}
                </div>
            </Container>
        );
    }

    if (!product) {
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
                <div className="text-center text-gray-500">
                    Product not found
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

            <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">📷</div>
                                    <div>No Image</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            {product.discount > 0 && (
                                <Badge className="badge-primary">{product.discount}% OFF</Badge>
                            )}
                            <Badge>New</Badge>
                        </div>
                        <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
                        <p className="text-gray-600 mb-4">{product.brand} • {product.model}</p>
                        <div className="text-2xl font-bold text-brand">${product.price}</div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500">Brand:</span>
                            <span className="ml-2 font-medium capitalize">{product.brand}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Model:</span>
                            <span className="ml-2 font-medium">{product.model}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Color:</span>
                            <span className="ml-2 font-medium capitalize">{product.color}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Category:</span>
                            <span className="ml-2 font-medium capitalize">{product.category}</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button className="flex-1 bg-brand text-white hover:bg-brand-dark">
                            Add to Cart
                        </Button>
                        <Button variant="outline" className="flex-1">
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}
