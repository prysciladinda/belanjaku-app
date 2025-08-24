import { Link } from "react-router-dom";
import Card from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import type { Product } from "../../types";

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        onAddToCart?.(product);
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
    };

    return (
        <Link to={`/products/${product.id}`} className="block">
            <Card className="p-3 hover:shadow-lg transition-shadow">
                <div className="relative aspect-square rounded-xl bg-gray-100 mb-3 overflow-hidden">
                    {product.image ? (
                        <>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                                loading="lazy"
                            />
                            <div className="hidden w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                                <div className="text-center">
                                    <div className="text-2xl mb-1">📷</div>
                                    <div className="text-xs">No Image</div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                            <div className="text-center">
                                <div className="text-2xl mb-1">📷</div>
                                <div className="text-xs">No Image</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                    {product.discount > 0 && (
                        <Badge className="badge-primary">{product.discount}% OFF</Badge>
                    )}
                    <Badge>New</Badge>
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{product.brand} • {product.model}</p>
                <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold">${product.price}</div>
                    {product.rating && (
                        <div className="text-xs text-gray-500">⭐ {product.rating}</div>
                    )}
                </div>
                <Button className="w-full" onClick={handleAddToCart}>
                    + Cart
                </Button>
            </Card>
        </Link>
    );
}
