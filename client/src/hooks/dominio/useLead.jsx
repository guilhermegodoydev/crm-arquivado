import { useEffect } from "react";
import { useFetch } from "../utils/useFetch";
import { useLocalStorage } from "../utils/useLocalStorage";

export function useLead() {
    const { dados: mock, carregando, erro } = useFetch("/mock/leads.json");
    const [ leads, setLeads ] = useLocalStorage("leads", []);

    useEffect(() => {
        if (!carregando && !erro && leads.length === 0 && mock)
            setLeads(mock);
    }, [mock, carregando, erro]);

    const criar = (lead) => {
        setLeads(prev => [...prev, { id: crypto.randomUUID(), ...lead}]);
    };

    const atualizar = (id, leadParcial) => {
        setLeads(prev => prev.map(l => l.id == id ? {...l, ...leadParcial} : l));
    };

    const remover = (leadId) => {
        setLeads(prev => prev.filter(l => l.id != leadId));
    };

    const buscar = (leadId) => {
        return leads.filter(l => l.id == leadId);
    };

    return { leads, carregando, erro, criar, atualizar, remover, buscar};
};