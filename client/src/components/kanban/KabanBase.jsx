import { closestCorners, DndContext, PointerSensor, DragOverlay, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Coluna } from "./Coluna";
import { useState } from "react";

export function KanbanBase({ colunas, onDragEnd, renderizarItem }) {
    const [ativoId, setAtivoId] = useState(null);
    const sensores = useSensors(useSensor(PointerSensor));

    const handleDragStart = (e) => {
        setAtivoId(e.active.id);
    };

    const handleDragEnd = (e) => {
        setAtivoId(null);
        onDragEnd(e);
    };

    const itemOverlay = ativoId ? colunas.flatMap(c => c.itens).find(i => i.id === ativoId) : null;
    
    return (
        <DndContext sensors={sensores} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <section className={`grid grid-cols-${colunas.length} gap-5`}>
                {colunas.map(c => (
                    <Coluna key={c.id} id={c.id}>
                        <h2>{c.titulo}</h2>

                        <SortableContext items={c.itens.map(i => i.id)} strategy={verticalListSortingStrategy}>    
                            <ul className="space-y-5">
                                {c.itens.map(i => renderizarItem(i))}
                            </ul>
                        </SortableContext>
                    </Coluna>
                ))}
            </section>

            <DragOverlay adjustScale={false}>
                {ativoId && itemOverlay ? (
                    <div>
                        {renderizarItem(itemOverlay)}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}