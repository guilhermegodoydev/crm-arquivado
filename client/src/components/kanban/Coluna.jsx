export function Coluna({ id, children }) {
    return (
        <div  
            id={String(id)}
            className="bg-gray-50 rounded-md p-2 overflow-y-auto max-h-[87vh] overflow-x-hidden"
        >
            {children}
        </div>
    );
}