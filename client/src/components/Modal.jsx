import { createPortal } from "react-dom";
import { CardBase } from "./cards/CardBase";
import { X } from "lucide-react";
import { useState } from "react";

export function Modal({ titulo, mensagem, className = "", children , aberto, onFechar }) {
    const modalRoot = document.getElementById("modal-root");
    const [ isExiting, setIsExiting ] = useState(false);

    const handleAnimationEnd = () => {
        if (isExiting) {
            setIsExiting(false);
            onFechar();
        }
    };

    if (!modalRoot) return null;
    if (!aberto) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 bg-gray-700/80 backdrop-blur-xs flex items-center justify-center">
            <CardBase onAnimationEnd={handleAnimationEnd}  className={`relative w-100 bg-white ${className} ${isExiting ? "animate-[fecharModal_1s_ease_forwards]" : "animate-[abrirModal_1s_ease_forwards]"}`}>
                <div className="flex justify-between items-center">
                    <h2>{titulo ?? 'Aviso'}</h2>
                    <X onClick={() => setIsExiting(true)} className="cursor-pointer" />
                </div>

                <hr className="border-gray-300" />
    
                {mensagem &&
                    <div className="py-5">
                        {mensagem}
                    </div>
                }

                {children}
            </CardBase>
        </div>,
        modalRoot
    );
}