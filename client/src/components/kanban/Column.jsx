import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { ListFilter } from "lucide-react";

export function Column({ id, title, items, renderItem, noItemsMessage, AddItemMessage, onAddItem }) {
    const { setNodeRef } = useDroppable({ id });

    const itemsId = items.map(item => item.id);

    return (
        <div className="bg-gray-100 shadow rounded max-h-137.5 overflow-x-hidden overflow-y-auto">
            <div className="sticky top-0 z-1 bg-gray-100">
                <h2 className="px-2 ">{title}</ h2> 
                <hr className="text-gray-300"/>
            </div>

            <div ref={setNodeRef} className="my-3 px-2">
                <SortableContext items={itemsId} id={id}>
                    <div className="space-y-5 min-h-123">
                        {items.length > 0 ? 
                            items.map(item => renderItem(item))
                            :
                            <div className="flex flex-col h-123 items-center justify-center py-12 px-4 text-gray-500 bg-gray-50 rounded border-2 border-dashed border-gray-300">
                                <ListFilter className="mx-auto h-8 w-8 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-700">Coluna Vazia</h3>
                                <p className="mt-1 text-xs text-gray-500">{noItemsMessage}</p>
                                <button className="mt-5 rounded p-1 text-sm bg-gray-100" onClick={onAddItem}>{AddItemMessage}</button>
                            </div>
                        }
                    </div>
                </SortableContext>
            </div>
        </div>
    );
};