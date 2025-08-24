import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
            <div className="container-px h-14 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="font-semibold text-brand text-xl md:text-2xl">
                    BelanjaKu
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 text-sm">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-brand font-medium" : "text-gray-600 hover:text-brand transition-colors"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            isActive ? "text-brand font-medium" : "text-gray-600 hover:text-brand transition-colors"
                        }
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/brands"
                        className={({ isActive }) =>
                            isActive ? "text-brand font-medium" : "text-gray-600 hover:text-brand transition-colors"
                        }
                    >
                        Brands
                    </NavLink>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden p-2 rounded-md text-gray-600 hover:text-brand hover:bg-gray-100 transition-colors"
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t bg-white">
                    <nav className="container-px py-4 space-y-2">
                        <NavLink
                            to="/"
                            onClick={closeMobileMenu}
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "text-brand bg-brand/10"
                                    : "text-gray-600 hover:text-brand hover:bg-gray-50"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/products"
                            onClick={closeMobileMenu}
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "text-brand bg-brand/10"
                                    : "text-gray-600 hover:text-brand hover:bg-gray-50"
                                }`
                            }
                        >
                            Products
                        </NavLink>
                        <NavLink
                            to="/brands"
                            onClick={closeMobileMenu}
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "text-brand bg-brand/10"
                                    : "text-gray-600 hover:text-brand hover:bg-gray-50"
                                }`
                            }
                        >
                            Brands
                        </NavLink>
                    </nav>
                </div>
            )}
        </header>
    );
}
