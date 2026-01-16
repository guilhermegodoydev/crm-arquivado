import { SortableItem } from "../kanban/SortableItem";
import { memo } from "react";

export const CardTarefa = memo(function CardTarefa({ tarefa, onClick, className }) {
    return (
        <SortableItem id={tarefa.id} data={{status: tarefa.status }} onClick={onClick} className={className}>
            <h3 className="truncate w-[90%]" title={tarefa.titulo}>{tarefa.titulo}</h3>

            <div>
                <p>{tarefa.dataConclusao ? `Concluída em: ${tarefa.dataConclusao}` : `Data Limite: ${tarefa.dataLimite}`}</p>
            </div>
        </SortableItem>
    );
});