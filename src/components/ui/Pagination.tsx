export default function Pagination() {
    return (
        <div className="flex justify-center gap-2 mt-6">
            <button className="px-3 h-9 rounded border">Prev</button>
            <button className="px-3 h-9 rounded border bg-brand text-white">1</button>
            <button className="px-3 h-9 rounded border">2</button>
            <button className="px-3 h-9 rounded border">Next</button>
        </div>
    );
}
