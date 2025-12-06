import { createPortal } from "react-dom";
import { CardBase } from "./CardBase";
import { X } from "lucide-react";

export function Modal({ titulo, mensagem, className = "", children , aberto, onFechar }) {
    const modalRoot = document.getElementById("modal-root");

    if (!modalRoot) return null;
    if (!aberto) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 bg-gray-700/80 flex items-center justify-center">
            <CardBase className={`relative w-100 bg-white ${className}`}>
                <div className="flex justify-between items-center">
                    <h2>{titulo ?? 'Aviso'}</h2>
                    <X onClick={onFechar} className="cursor-pointer" />
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