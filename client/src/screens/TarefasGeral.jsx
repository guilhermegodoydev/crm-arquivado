import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { Column } from "../components/kanban/Column";
import { Drawer } from "../components/kanban/Drawer";
import { CardTarefa } from "../components/cards/CardTarefa";
import { useTarefas } from "../hooks/dominio/useTarefas";
import { useConfigsUsuario } from "../context/ConfigsUsuario";
import { Modal } from "../components/Modal";
import { useModal } from "../hooks/ui/useModal";
import { FormTarefa } from "../components/formTarefa";

export function TarefasGeral() {
    const { config } = useConfigsUsuario();
    const [ limitador, setLimitador ] = useState({ index: 0, limite: config.qtItensPag});
    const { tarefas, carregando, erro, atualizarStatus, deletar } = useTarefas(limitador.index, limitador.limite);
    const [ activeTask, setActiveTask ] = useState(null);
    const [ drawerActive, setDrawerActive ] = useState(false);
    const [ tasks, setTasks ] = useState(null);
    const { modal, abrir, fechar } = useModal();

    useEffect(() => {
        if (!carregando && !erro && tarefas) {
            setTasks(tarefas);
        }
    }, [tarefas, carregando, erro]);

    const handleDragEnd = (e) => {
        setActiveTask(null);
        const { active, over } = e;

        if (!over) return;
        if (active.id === over.id) return;
        
        const statusAtual = active.data.current.status;
        const novoStatus = over?.data?.current?.sortable?.containerId ?? over.id;

        if (statusAtual === novoStatus) {
           //
        }
        else {
            atualizarStatus(active.id, statusAtual, novoStatus);
        }
    };
    
    const handleDragStart = (e) => {
        const task = Object.keys(tasks).flatMap(block => tasks[block]).find(task => task.id === e.active.id);
        setActiveTask(task);
    };

    const openDrawer = () => {
        setDrawerActive(true);
    };

    const renderTask = (tarefa) => {
        return <CardTarefa onClick={openDrawer} key={tarefa.id} tarefa={tarefa} className={activeTask?.id == tarefa.id ? "invisible" : "visible"}/>
    };

    if (!tasks) return <p>Nenhuma Tarefa encontrada</p>;
    if (carregando) return <p>Carregando...</p>;
    if (erro) return <p>Erro</p>;

    const noTasksMessage = "Arraste itens para cá ou adicione uma nova tarefa.";
    const messageButton = "Adicionar nova tarefa";

    return (
        <>
            <section className="grid grid-cols-3 gap-8">
                <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <Column 
                        id={"pendente"} 
                        title={`A Fazer (${tasks?.pendente?.length || 0})`} 
                        items={tasks.pendente} 
                        renderItem={renderTask}
                        noItemsMessage={noTasksMessage}
                        AddItemMessage={messageButton}
                        onAddItem={abrir}
                    />
                    <Column 
                        id={"andamento"} 
                        title={`Em andamento (${tasks?.andamento?.length || 0})`} 
                        items={tasks.andamento} 
                        renderItem={renderTask}
                        noItemsMessage={noTasksMessage}
                        AddItemMessage={messageButton}
                        onAddItem={abrir}
                    />
                    <Column 
                        id={"concluida"} 
                        title={`Conluído (${tasks?.concluida?.length || 0})`} 
                        items={tasks.concluida} 
                        renderItem={renderTask}
                        noItemsMessage={noTasksMessage}
                        AddItemMessage={messageButton}
                        onAddItem={abrir}
                    />

                    <DragOverlay>
                        { activeTask ? (
                            <CardTarefa tarefa={activeTask}/>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </section>

            <Drawer title={"teste"} isOpen={drawerActive} onClose={() => setDrawerActive(false)}/>

            <Modal titulo="Nova Tarefa" aberto={modal.aberto} onFechar={fechar}>
                <FormTarefa/>
            </Modal>
        </>
    );
};