import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import ProductCard from "../../components/ui/ProductCard";
import Card from "../../components/ui/Card";
import { Skeleton } from "../../components/ui/Skeleton";
import { useProducts, useProductCategories } from "../../hooks/api";
import { useBrands } from "../../hooks/api";

// Category images data
const categoryImages: Record<string, { image: string; alt: string }> = {
    tv: {
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=150&h=150&fit=crop&crop=center",
        alt: "TV Category"
    },
    audio: {
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop&crop=center",
        alt: "Audio Category"
    },
    laptop: {
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop&crop=center",
        alt: "Laptop Category"
    },
    mobile: {
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop&crop=center",
        alt: "Mobile Category"
    },
    gaming: {
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&h=150&fit=crop&crop=center",
        alt: "Gaming Category"
    },
    appliances: {
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=center",
        alt: "Appliances Category"
    }
};

function Hero() {
    return (
        <section className="bg-gradient-to-r from-brand-50 to-white">
            <Container className="py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <p className="uppercase tracking-wide text-sm text-brand">BelanjaKu</p>
                    <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                        Beli mudah, bayar aman, sampai cepat.
                    </h1>
                    <p className="mt-3 text-gray-600">
                        Barang asli, dukungan pelanggan responsif.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Link to="/products" className="bg-black text-white hover:bg-brand-dark px-6 py-3 rounded-lg font-medium transition-colors">
                            Belanja Sekarang
                        </Link>
                        <span className="inline-flex items-center text-sm text-gray-500">
                            Pengiriman cepat!
                        </span>
                    </div>
                </div>
                <div className="relative">
                    <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=600&fit=crop&crop=center"
                            alt="Apple AirPods Collection - Premium Audio Products"
                            className="w-full h-full object-bottom object-cover"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                        <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">🎧</span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

function BestSeller() {
    const { data: response, isLoading, error } = useProducts(8);
    const products = response?.products || [];

    if (isLoading) {
        return (
            <section className="py-10">
                <Container>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Bestselling • Products</h2>
                        <Link to="/products" className="text-sm text-brand hover:underline">
                            More products →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-64" />
                        ))}
                    </div>
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-10">
                <Container>
                    <div className="text-center text-red-500">
                        Error loading products: {error.message}
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className="py-10">
            <Container>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Bestselling • Products</h2>
                    <Link to="/products" className="text-sm text-brand hover:underline">
                        More products →
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.length > 0 ? (
                        products.slice(0, 4).map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={(product) => {
                                    console.log('Added to cart:', product);
                                }}
                            />
                        ))
                    ) : (
                        <div className="col-span-4 text-center text-gray-500">
                            No products available
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}

function PopularCategories() {
    const { data: categories, isLoading, error } = useProductCategories();

    if (isLoading) {
        return (
            <section className="py-8">
                <Container>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Explore Popular Categories</h2>
                        <Link to="/categories" className="text-brand hover:underline text-sm">
                            View All →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Skeleton key={i} className="h-32" />
                        ))}
                    </div>
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-8">
                <Container>
                    <div className="text-center text-red-500">
                        Error loading categories: {error.message}
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className="py-8">
            <Container>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Explore Popular Categories</h2>
                    <Link to="/categories" className="text-brand hover:underline text-sm transition-colors hover:text-brand-dark">
                        View All →
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {categories && categories.length > 0 ? (
                        categories.slice(0, 6).map((category) => {
                            const categoryImage = categoryImages[category.toLowerCase()];
                            return (
                                <Link key={category} to={`/categories/${category}`}>
                                    <div className="group cursor-pointer">
                                        <div className="aspect-square rounded-2xl bg-gray-100 mb-3 overflow-hidden">
                                            {categoryImage ? (
                                                <img
                                                    src={categoryImage.image}
                                                    alt={categoryImage.alt}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <div className="text-center">
                                                        <div className="text-2xl mb-1">📱</div>
                                                        <div className="text-sm">{category}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="font-semibold text-sm text-center capitalize">{category}</h3>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            No categories available
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}

function OfficialStores() {
    const { data: brands, isLoading, error } = useBrands();

    if (isLoading) {
        return (
            <section className="py-8 bg-gray-50">
                <Container>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Explore Official Brand Stores</h2>
                        <Link to="/brands" className="text-brand hover:underline text-sm">
                            View All →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                            <Skeleton key={i} className="h-16" />
                        ))}
                    </div>
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-8 bg-gray-50">
                <Container>
                    <div className="text-center text-red-500">
                        Error loading brands: {error.message}
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className="py-8 bg-gray-50">
            <Container>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Explore Official Brand Stores</h2>
                    <Link to="/brands" className="text-brand hover:underline text-sm transition-colors hover:text-brand-dark">
                        View All →
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
                    {brands && brands.length > 0 ? (
                        brands.slice(0, 9).map((brand) => (
                            <Link key={brand} to={`/brands/${brand}`}>
                                <Card className="p-4 text-center text-sm hover:shadow-lg transition-shadow cursor-pointer">
                                    <span className="capitalize">{brand}</span>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            No brands available
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}

export default function HomePage() {
    return (
        <main>
            <Hero />
            <PopularCategories />
            <OfficialStores />
            <BestSeller />
        </main>
    );
}
