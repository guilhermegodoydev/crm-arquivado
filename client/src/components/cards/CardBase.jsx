export function CardBase({children, className}) {
    return (
        <div className={`p-6 rounded-md shadow-md border border-gray-200 ${className}`}>
            {children}
        </div>
    );
}