import { useEffect, useState } from "react";

export function useLocalStorage(chave, valorInicial) {
    const [valor, setValor] = useState(() => {
        try {
            const dadosLocal = localStorage.getItem(chave);
            return dadosLocal ? JSON.parse(dadosLocal) : valorInicial;
        } catch {
            return valorInicial;
        }
    });

    useEffect(() => {
        localStorage.setItem(chave, JSON.stringify(valor));
    }, [chave, valor]);

    return [valor, setValor];
}