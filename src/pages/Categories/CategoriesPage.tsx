import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useProductCategories } from "../../hooks/api";
import { Skeleton } from "../../components/ui/Skeleton";

export default function CategoriesPage() {
    const { data: categories, isLoading, error } = useProductCategories();

    if (isLoading) {
        return (
            <Container className="py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold mb-2">All Categories</h1>
                    <p className="text-gray-600">Explore all product categories</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                        <Skeleton key={i} className="h-32" />
                    ))}
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-10">
                <div className="text-center text-red-500">
                    Error loading categories: {error.message}
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold mb-2">All Categories</h1>
                <p className="text-gray-600">Explore all product categories</p>
            </div>

            {categories && categories.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <Link key={category} to={`/categories/${category}`}>
                            <div className="group cursor-pointer">
                                <div className="aspect-square rounded-2xl bg-gray-100 mb-3 overflow-hidden flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-3xl mb-1">📱</div>
                                        <div className="text-sm">{category}</div>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-sm text-center capitalize">{category}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-10">
                    <h2 className="text-xl font-semibold mb-2">No categories found</h2>
                    <p>No categories available at the moment.</p>
                </div>
            )}
        </Container>
    );
}