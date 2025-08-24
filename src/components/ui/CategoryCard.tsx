import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

interface CategoryCardProps {
  category: string;
  image: string;
  alt: string;
  className?: string;
}

export function CategoryCard({ category, image, alt, className }: CategoryCardProps) {
  return (
    <Link to={`/categories/${category}`} className={cn("flex-shrink-0", className)}>
      <div className="group cursor-pointer">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-gray-200 group-hover:border-brand transition-all duration-200 group-hover:shadow-md">
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
            onError={(e) => {
              // Fallback image
              e.currentTarget.src = "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=150&h=150&fit=crop&crop=center";
            }}
          />
        </div>
        <p className="text-xs text-center capitalize text-gray-700 group-hover:text-brand transition-colors">
          {category}
        </p>
      </div>
    </Link>
  );
}
