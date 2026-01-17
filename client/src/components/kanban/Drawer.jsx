import { X } from "lucide-react";
import { useState } from "react";

export function Drawer({ title, isOpen, onClose, children }) {
    const [ isExiting, setIsExiting ] = useState(false);

    if (!isOpen) return;

    const handleAnimationEnd = () => {
        if (isExiting) {
            setIsExiting(false);
            onClose();
        }
    };

    return (
        <div onAnimationEnd={handleAnimationEnd} className={`${isExiting ? "animate-[closeDrawer_1s_ease_forwards]" : "animate-[openDrawer_1s_ease_forwards]"} absolute bottom-0 right-10 bg-white w-100 rounded border-2 px-2 border-gray-200`}>
            <div className="flex items-center justify-between">
                <h3>{title}</h3>
                <X className="cursor-pointer" onClick={() => setIsExiting(true)}/>
            </div>
            <hr className="text-gray-300"/>

            {children}
        </div>
    );
};