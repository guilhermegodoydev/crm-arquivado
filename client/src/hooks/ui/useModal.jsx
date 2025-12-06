import { useState } from "react";

export function useModal() {
    const [ modal, setModal ] = useState({
        acao: null,
        aberto: false,
        mensagem: "",
        children: null,
    });

    const abrir = (config = {}) => {
        setModal({
            acao: config.acao ?? null,
            aberto: true,
            mensagem: config.mensagem ?? "",
            children: config.children ?? null
        });
    };

    const fechar = () => {
        setModal({
            acao: null,
            aberto: false,
            mensagem: "",
            children: null,
        });
    };
    
    const atualizar = (modalParcial) => {
        setModal(prev => ({
            ...prev,
            ...modalParcial
        }));
    };

    const confirmarAcao = () => {
        modal.acao?.();
        fechar();
    };

    return { modal, abrir, fechar, atualizar, confirmarAcao };
}