import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import Card from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useBrands, useProductsByBrand } from "../../hooks/api";
import { Skeleton } from "../../components/ui/Skeleton";

export default function BrandsPage() {
    const { data: brands, isLoading, error } = useBrands();
    const [currentPage, setCurrentPage] = useState(1);
    const brandsPerPage = 12;
    const topRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const totalPages = brands ? Math.ceil(brands.length / brandsPerPage) : 0;
    const startIndex = (currentPage - 1) * brandsPerPage;
    const endIndex = startIndex + brandsPerPage;
    const currentBrands = brands ? brands.slice(startIndex, endIndex) : [];

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            scrollToTop();
        }
    };

    const getBrandEmoji = (brandName: string): string => {
        const brand = brandName.toLowerCase();
        
        if (brand.includes('apple')) return '🍎';
        if (brand.includes('samsung')) return '📱';
        if (brand.includes('sony')) return '🎧';
        if (brand.includes('lg')) return '📺';
        if (brand.includes('asus') || brand.includes('acer') || brand.includes('hp') || brand.includes('dell') || brand.includes('lenovo') || brand.includes('msi') || brand.includes('gigabyte')) return '💻';
        if (brand.includes('intel') || brand.includes('amd')) return '🔧';
        if (brand.includes('nvidia')) return '🎮';
        if (brand.includes('microsoft')) return '🪟';
        if (brand.includes('google')) return '🔍';
        if (brand.includes('amazon')) return '📦';
        if (brand.includes('jbl') || brand.includes('bose') || brand.includes('beats') || brand.includes('boat') || brand.includes('sennheiser') || brand.includes('audio') || brand.includes('speaker') || brand.includes('headphone')) return '🎧';
        if (brand.includes('gaming') || brand.includes('esports') || brand.includes('razer') || brand.includes('logitech') || brand.includes('steelseries') || brand.includes('corsair')) return '🎮';
        if (brand.includes('bosch') || brand.includes('whirlpool') || brand.includes('panasonic') || brand.includes('sharp') || brand.includes('toshiba')) return '🏠';
        if (brand.includes('philips')) return '💡';
        if (brand.includes('nike') || brand.includes('adidas') || brand.includes('puma') || brand.includes('reebok') || brand.includes('under') || brand.includes('armour')) return '👟';
        
        return '��';
    };

    if (isLoading) {
        return (
            <Container className="py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold mb-2">All Brands</h1>
                    <p className="text-gray-600">Discover official brand stores</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                        <Skeleton key={i} className="h-48" />
                    ))}
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-10">
                <div className="text-center text-red-500">
                    Error loading brands: {error.message}
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-10">
            <div ref={topRef} />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-semibold mb-2">All Brands</h1>
                    <p className="text-gray-600">
                        Showing {startIndex + 1}-{Math.min(endIndex, brands?.length || 0)} of {brands?.length || 0} brands
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Page {currentPage} of {totalPages} • {currentBrands.length} brands on this page
                    </p>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        {currentPage > 1 && (
                            <Button onClick={() => handlePageChange(currentPage - 1)} variant="outline" className="px-3 py-2">
                                ← Previous
                            </Button>
                        )}

                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <Button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        variant={currentPage === pageNum ? "primary" : "outline"}
                                        className="w-10 h-10 p-0"
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </div>

                        {currentPage < totalPages && (
                            <Button onClick={() => handlePageChange(currentPage + 1)} variant="outline" className="px-3 py-2">
                                Next →
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {currentBrands && currentBrands.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
                    {currentBrands.map((brand) => (
                        <BrandCard key={brand.toLowerCase().trim()} brand={brand} getBrandEmoji={getBrandEmoji} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-10">
                    <h2 className="text-xl font-semibold mb-2">No brands found</h2>
                    <p>No brands available at the moment.</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                    <div className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages} • {brands?.length || 0} total brands
                    </div>

                    <div className="flex items-center gap-2">
                        {currentPage > 1 && (
                            <Button onClick={() => handlePageChange(currentPage - 1)} variant="outline" size="sm">
                                ← Previous
                            </Button>
                        )}

                        <span className="text-sm text-gray-600">{currentPage} / {totalPages}</span>

                        {currentPage < totalPages && (
                            <Button onClick={() => handlePageChange(currentPage + 1)} variant="outline" size="sm">
                                Next →
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </Container>
    );
}

function BrandCard({ brand, getBrandEmoji }: { brand: string; getBrandEmoji: (brand: string) => string }) {
    const { data: brandProducts } = useProductsByBrand(brand);

    return (
        <Link to={`/brands/${brand}`}>
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 mb-3 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <div className="text-6xl md:text-5xl lg:text-6xl">
                        {getBrandEmoji(brand)}
                    </div>
                </div>
                <h3 className="font-semibold text-sm capitalize">{brand}</h3>
                <p className="text-xs text-gray-500 mt-1">
                    {brandProducts?.totalFound || 0} products
                </p>
            </Card>
        </Link>
    );
}
