export function Input({ label, type = "text", className, error }) {
    return (
        <div className={`relative ${className}`}>
            <input 
                id={`input-${label}`} 
                className="peer w-full block border border-2 py-0.5 border-blue-500 bg-white focus:outline-none focus:border-blue-700 rounded px-1.5" type={type}
                placeholder=" "
            />
            <label 
                htmlFor={`input-${label}`} 
                className="
                    absolute left-[4px] top-[4px] bg-white px-1 text-gray-500 
                    transition-all duration-300 ease-out pointer-events-none
                    peer-focus:-top-[12px] peer-focus:text-sm peer-focus:text-blue-700 peer-focus:font-semibold
                    peer-[:not(:placeholder-shown)]:-top-[12px] peer-[:not(:placeholder-shown)]:text-sm
                "
            >
                {label}
            </label>

            <p className="items-center text-sm text-red-500 font-semibold">{error}</p>
        </div>
    );
};

