export function CardBase({children, className, onAnimationEnd}) {
    return (
        <div className={`p-6 rounded-md shadow-md border border-gray-200 ${className}`} onAnimationEnd={onAnimationEnd}>
            {children}
        </div>
    );
}