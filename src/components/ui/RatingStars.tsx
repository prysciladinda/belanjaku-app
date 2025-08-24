export default function RatingStars({ value = 4.5, count = 128 }: { value?: number; count?: number }) {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    return (
        <div className="flex items-center gap-2">
            <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => {
                    const isFull = i < full;
                    const isHalf = i === full && half;
                    return (
                        <span key={i} className="text-amber-500">
                            {isFull ? "★" : isHalf ? "☆" : "☆"}
                        </span>
                    );
                })}
            </div>
            <span className="text-sm text-gray-500">{value.toFixed(1)} · {count}</span>
        </div>
    );
}
