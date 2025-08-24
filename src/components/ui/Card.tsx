import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("card", className)} {...props} />;
}
