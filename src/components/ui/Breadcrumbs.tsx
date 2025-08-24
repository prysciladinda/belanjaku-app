import { Link } from "react-router-dom";

type Crumb = { label: string; to?: string };
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
    return (
        <nav className="text-sm text-gray-500">
            {items.map((c, i) => (
                <span key={i} className="inline-flex items-center">
                    {c.to ? (
                        <Link to={c.to} className="hover:text-gray-700">{c.label}</Link>
                    ) : (
                        <span className="text-gray-700">{c.label}</span>
                    )}
                    {i < items.length - 1 && <span className="mx-2 text-gray-300">/</span>}
                </span>
            ))}
        </nav>
    );
}
