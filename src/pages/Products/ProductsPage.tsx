import { useState, useEffect, useRef } from "react";
import Container from "../../components/ui/Container";
import ProductCard from "../../components/ui/ProductCard";
import { Skeleton } from "../../components/ui/Skeleton";
import { Button } from "../../components/ui/Button";
import { useProductsPaginated } from "../../hooks/api";

export default function ProductsPage() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [allProducts, setAllProducts] = useState<any[]>([]);

    const topRef = useRef<HTMLDivElement>(null);

    // Fetch products untuk halaman pertama
    const { data: firstPageResponse, isLoading: isFirstPageLoading } = useProductsPaginated(1, 50);

    // Effect untuk mengatur total pages dan products
    useEffect(() => {
        if (firstPageResponse) {
            const total = firstPageResponse.total || 150;
            const calculatedTotalPages = Math.ceil(total / 50);
            setTotalPages(calculatedTotalPages);
            setTotalProducts(total);

            if (firstPageResponse.products) {
                setAllProducts(firstPageResponse.products);
            }
        }
    }, [firstPageResponse]);

    // Function untuk menghitung range products yang ditampilkan
    const getProductRange = () => {
        const productsPerPage = 50;
        const startProduct = (page - 1) * productsPerPage + 1;
        const endProduct = Math.min(page * productsPerPage, totalProducts);
        return { startProduct, endProduct };
    };

    // Function untuk smooth scroll ke atas
    const scrollToTop = () => {
        topRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    // Function untuk load halaman baru - PERBAIKAN: Gunakan state untuk trigger re-fetch
    const loadPage = (pageNum: number) => {
        if (pageNum >= 1 && pageNum <= totalPages && pageNum !== page) {
            setPage(pageNum);
            scrollToTop();
        }
    };

    // Fetch data untuk halaman yang aktif
    const { data: currentPageResponse, isLoading: isCurrentPageLoading } = useProductsPaginated(page, 50);

    // Effect untuk update products ketika halaman berubah
    useEffect(() => {
        if (currentPageResponse && currentPageResponse.products) {
            setAllProducts(currentPageResponse.products);
        }
    }, [currentPageResponse]);

    const { startProduct, endProduct } = getProductRange();
    const isLoading = isFirstPageLoading || isCurrentPageLoading;

    if (isLoading) {
        return (
            <Container className="py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold mb-2">All Products</h1>
                    <p className="text-gray-600">Loading products...</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <Skeleton key={i} className="h-64" />
                    ))}
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-10">
            <div ref={topRef} />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-semibold mb-2">All Products</h1>
                    <p className="text-gray-600">
                        Showing {startProduct}-{endProduct} of {totalProducts} products
                    </p>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        {page > 1 && (
                            <Button
                                onClick={() => loadPage(page - 1)}
                                variant="outline"
                                className="px-3 py-2"
                            >
                                ← Previous
                            </Button>
                        )}

                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (page <= 3) {
                                    pageNum = i + 1;
                                } else if (page >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = page - 2 + i;
                                }

                                return (
                                    <Button
                                        key={pageNum}
                                        onClick={() => loadPage(pageNum)}
                                        variant={page === pageNum ? "primary" : "outline"}
                                        className="w-10 h-10 p-0"
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </div>

                        {page < totalPages && (
                            <Button
                                onClick={() => loadPage(page + 1)}
                                variant="outline"
                                className="px-3 py-2"
                            >
                                Next →
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {allProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={(product) => {
                            console.log('Added to cart:', product);
                        }}
                    />
                ))}
            </div>
        </Container>
    );
}
