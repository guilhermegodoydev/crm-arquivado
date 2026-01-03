import { useEffect } from "react";
import { useFetch } from "../utils/useFetch";
import { useLocalStorage } from "../utils/useLocalStorage";

export function useTarefas(indexInicio, limite) {
    const { dados: mock, carregando, erro, carregarMais } = useFetch("/mock/tarefas.json");
    const [ tarefas, setTarefas ] = useLocalStorage("tarefas", { pendentes: [], andamento: [], concluidas: [] });
    
    useEffect(() => {
        if (!carregando && !erro && mock && Object.values(tarefas).every(itens => itens.length === 0) ) {
            const tarefasPendentes = [];
            const tarefasEmAndamento = [];
            const tarefaConcluidas = [];

            mock.forEach(tarefa => {
                const status = tarefa.status.toLowerCase();
                if (status == "a fazer") tarefasPendentes.push(tarefa);
                else if (status == "em andamento") tarefasEmAndamento.push(tarefa);
                else if (status == "concluído") tarefaConcluidas.push(tarefa);
            });

            setTarefas({
                pendentes: tarefasPendentes.slice(indexInicio, limite),
                andamento: tarefasEmAndamento.slice(indexInicio, limite),
                concluidas: tarefaConcluidas.slice(indexInicio, limite),
            });
        }
    }, [mock, carregando, erro]);

    const listarTarefasCliente = (idCliente) => {
        if (!tarefas) return [];
        const todas = [ ...(tarefas.pendentes || []), ...(tarefas.andamento || []), ...(tarefas.concluidas || []) ];
        return todas.filter(t => t.idCliente == idCliente);
    };  

    const carregarMaisTarefas = () => {
        //
    };

    const chavePorStatus = (status) => {
        const s = String(status || "").toLowerCase();
        if (s === "a fazer") return "pendentes";
        if (s === "em andamento") return "andamento";
        if (s === "concluído") return "concluidas";
        return null;
    };

    const atualizarStatus = (tarefaId, statusAtual, novoStatus) => {
        const blocoAtual = chavePorStatus(statusAtual);
        const novoBloco = chavePorStatus(novoStatus);

        let tarefaAtualizada = tarefas[blocoAtual].find(t => t.id === tarefaId);
        tarefaAtualizada.status = novoStatus;

        let novasTarefas = {};

        Object.keys(tarefas).forEach(bloco => {
            if (bloco === blocoAtual) {
                novasTarefas[bloco] = tarefas[bloco].filter(t => t.id != tarefaId);
            }
            else if (bloco === novoBloco){
                if (novoStatus === "concluído") {
                    tarefaAtualizada.dataConclusao = new Date().toISOString().split("T")[0];
                } else if (statusAtual === "concluído") {
                    tarefaAtualizada.dataConclusao = null;
                }
                
                novasTarefas[bloco] = [tarefaAtualizada, ...(tarefas[bloco] || [])];
            } 
            else {
                novasTarefas[bloco] = tarefas[bloco];
            }
        });

        setTarefas(novasTarefas);
    };

    const atualizar = (tarefaId, statusAtual, tarefaParcial) => {
        //
    };

    return { tarefas, carregando, erro, listarTarefasCliente, carregarMaisTarefas, atualizar, atualizarStatus };
}