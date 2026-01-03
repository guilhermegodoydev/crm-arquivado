import { TarefaArastavel } from "../components/kanban/TarefaArastavel";
import { useConfigsUsuario } from "../context/ConfigsUsuario";
import { useTarefas } from "../hooks/dominio/useTarefas";
import { KanbanBase } from "../components/kanban/KabanBase";

export function TarefasGeral() {
    const { config } = useConfigsUsuario();
    const { tarefas, carregando, erro, atualizarStatus } = useTarefas(0, config.qtItensPag);

    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (!over) return;
        
        const statusAtual = active.data.current.status.toLowerCase();
        const novoStatus = over.data.current.status.toLowerCase();

        if (statusAtual === novoStatus) return;

        const tarefaId = active.id;
        atualizarStatus(tarefaId, statusAtual, novoStatus);
    };
    
    if (carregando) return <p>Carregando...</p>;
    if (!tarefas || tarefas.length === 0) return <p>Nenhuma tarefa encontrada</p>;
    if (erro) return <p>Erro ao buscar o cliente</p>;

    const colunas = [
        { titulo: `A Fazer (${tarefas.pendentes.length})`, id: "A Fazer", itens: tarefas.pendentes},
        { titulo: `Em Andamento (${tarefas.andamento.length})`, id: "Em Andamento", itens: tarefas.andamento},
        { titulo: `Concluído (${tarefas.concluidas.length})`, id: "Concluído", itens: tarefas.concluidas}
    ];

    const renderizarTarefa = (tarefa) => {
        return <TarefaArastavel key={tarefa.id} tarefa={tarefa}/>
    };

    return (
        <KanbanBase colunas={colunas} onDragEnd={handleDragEnd} renderizarItem={renderizarTarefa}/>
    );
};