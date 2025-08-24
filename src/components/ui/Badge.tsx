import { cn } from "../../utils/cn";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
}

export function Badge({ children, className }: BadgeProps) {
    return (
        <span className={cn("badge", className)}>
            {children}
        </span>
    );
}

export function CategoryPill({ label }: { label: string }) {
    return (
        <span className="badge cursor-pointer hover:bg-brand hover:text-white transition-colors capitalize">
            {label}
        </span>
    );
}