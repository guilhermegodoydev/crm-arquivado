import { useEffect } from "react";

import { useFetch } from "../utils/useFetch";
import { useLocalStorage } from "../utils/useLocalStorage";

export function useEtapa() {
    const { dados: mock, carregando, erro } = useFetch("/mock/etapas.json");
    const [ etapas, setEtapas ] = useLocalStorage("etapas" , []);

    useEffect(() => {
        if (!carregando && !erro && etapas.length === 0 && mock) 
            setEtapas(mock);
    }, [mock, carregando, erro]);
    
    const criar = (etapa) => {
        setEtapas(prev => [...prev, { id: crypto.randomUUID(), ...etapa}]);
    };

    const atualizar = (id, leadParcial) => {
        setEtapas(prev => prev.map(e => e.id == id ? {...e, ...leadParcial} : c));
    };

    const remover = (etapaId) => {
        setEtapas(prev => prev.filter(e => e.id != etapaId));
    };

    const buscar = (etapaId) => {
        return etapas.find(e => e.id == etapaId);
    };

    return { etapas, carregando, erro, criar, atualizar, remover, buscar };
}