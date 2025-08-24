import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline";
}

export function Button({
    className,
    variant = "primary",
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-full px-4 h-10 transition",
                variant === "primary" && "bg-brand text-white hover:opacity-95",
                variant === "outline" && "border border-brand text-brand hover:bg-brand hover:text-white",
                className
            )}
            {...props}
        />
    );
}
