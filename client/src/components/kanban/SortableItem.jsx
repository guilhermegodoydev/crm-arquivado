import { useDndContext } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export function SortableItem({ id, data, className, onClick, children }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id, data });
    const { active } = useDndContext();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            className={`relative cursor-pointer bg-white shadow rounded p-1 ${className}`}
            onClick={onClick}
            >
            <button className={`${active ? "cursor-grabbing" : "cursor-grab"} absolute right-0`} {...listeners} {...attributes}><GripVertical/></button>
            {children}
        </div>
    );
};