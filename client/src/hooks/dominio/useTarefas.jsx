import { useEffect } from "react";
import { useFetch } from "../utils/useFetch";
import { useLocalStorage } from "../utils/useLocalStorage";

export function useTarefas(indexInicio, limite) {
    const { dados: mock, carregando, erro, carregarMais } = useFetch("/mock/tarefas.json");
    const [ tarefas, setTarefas ] = useLocalStorage("tarefas", { pendente: [], andamento: [], concluida : [] });
    
    useEffect(() => {
        if (!carregando && !erro && mock && Object.values(tarefas).every(itens => itens.length === 0) ) {
            const tarefasPendentes = [];
            const tarefasEmAndamento = [];
            const tarefaConcluidas = [];

            mock.forEach(tarefa => {
                const status = tarefa.status;
                if (status === "pendente") tarefasPendentes.push(tarefa);
                else if (status === "andamento") tarefasEmAndamento.push(tarefa);
                else if (status === "concluida") tarefaConcluidas.push(tarefa);
            });
            
            setTarefas({
                pendente: tarefasPendentes.slice(indexInicio, limite),
                andamento: tarefasEmAndamento.slice(indexInicio, limite),
                concluida: tarefaConcluidas.slice(indexInicio, limite),
            });
        }
    }, [mock, carregando, erro]);
    
    const listarTarefasCliente = (idCliente) => {
        if (!tarefas) return [];
        const todas = [ ...(tarefas.pendentes || []), ...(tarefas.andamento || []), ...(tarefas.concluidas || []) ];
        return todas.filter(t => t.idCliente == idCliente);
    };  

    const carregarMaisTarefas = (indexInicio, limite) => {
        //return tarefas.slice(indexInicio, limite);
    };

    const alterarOrdem = (tarefaId, index) => {
        //
    };

    const atualizarStatus = (tarefaId, statusAtual, novoStatus) => {
        const blocoAtual = statusAtual;
        const novoBloco = novoStatus;

        let tarefaAtualizada = tarefas[blocoAtual].find(t => t.id === tarefaId);
        tarefaAtualizada.status = novoStatus;

        let novasTarefas = {};

        Object.keys(tarefas).forEach(bloco => {
            if (bloco === blocoAtual) {
                novasTarefas[bloco] = tarefas[bloco].filter(t => t.id != tarefaId);
            }
            else if (bloco === novoBloco){
                if (novoStatus === "concluida") {
                    tarefaAtualizada.dataConclusao = new Date().toISOString().split("T")[0];
                } else if (statusAtual === "concluida") {
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

    const deletar = (tarefaId) => {
        setTarefas(prev => {
            const novasTarefas = Object.entries(prev).map(([chave, valor]) => {
                const novoValor = valor.filter(tarefa => tarefa.id !== tarefaId);
                return [chave, novoValor];
            });

            return Object.fromEntries(novasTarefas);
        });
    };

    return { tarefas, carregando, erro, listarTarefasCliente, carregarMaisTarefas, atualizar, atualizarStatus, deletar };
}