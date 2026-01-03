import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export function ItemArrastavel ({ id, data, arrastando = false, children }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data
    });

    const style = arrastando ? undefined : { transform: CSS.Transform.toString(transform), transition};

    return (
        <li ref={setNodeRef} style={style}  className={`list-none bg-white ${arrastando ? "hidden" : ""}`}>

            {children}

            <button {...listeners} {...attributes}>
                <GripVertical className="size-5"/>
            </button>
        </li>
    );
};