import { CardBase } from "../cards/CardBase";
import { PhoneCall } from "lucide-react";
import { useState } from "react";
import { UnfoldVertical, FoldVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export function TarefaArastavel({ tarefa, isOverlay = false }) {
    const [ expandido, setExpandido ] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ 
        id: tarefa.id,
        data: {
            status: tarefa.status
        }
    });

    const style = isOverlay ? undefined : { transform: CSS.Transform.toString(transform), transition}
    
    return (
        <li ref={setNodeRef} style={style} className="list-none bg-white">
            <CardBase className="!p-3">
                <div className="flex justify-between items-center">
                    <p className="font-semiBold text-[18px] truncate" title={tarefa.titulo} >{tarefa.titulo}</p>
                    <div className="flex gap-2">
                        {expandido ?
                            <FoldVertical className="cursor-pointer size-5" onClick={() => setExpandido(false)}/>
                            :
                            <UnfoldVertical className="cursor-pointer size-5" onClick={() => setExpandido(true)}/>
                        }
                        <button
                            {...listeners}
                            {...attributes}
                            className="cursor-grab active:cursor-grabbing"
                        >
                            <GripVertical className="size-5"/>
                        </button>
                    </div>
                </div>

                <hr className="border-gray-300"/>

                <div className={`flex items-center ${expandido ? "mb-3" : "mb-0"}`}>
                    <PhoneCall className="w-4.5 mr-2"/>
                    <p className="text-lg">Anderson Silva</p>
                </div>
                {expandido &&
                    <p className="max-h-25 overflow-y-auto">{tarefa.descricao}</p>
                }

                <div className={`flex flex-wrap justify-between text-gray-500 ${expandido ? "mt-5" : "mt-0"}`}>
                    <p>Limite: {tarefa.dataLimite}</p>
                    <p>Conclusão: {tarefa.dataConclusao || "Não Concluída"}</p>
                </div>
            </CardBase>
        </li>
    );
}