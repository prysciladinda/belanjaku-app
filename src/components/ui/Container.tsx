import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export default function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("container mx-auto px-3 sm:px-4 md:px-6", className)} {...props} />;
}
