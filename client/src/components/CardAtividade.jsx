import { Trash2 } from "lucide-react";
import { CardBase } from "./CardBase";

export function CardAtividade({id, data, tipo, descricao, onDeletar}) {
    return (
        <CardBase className="flex items-start justify-between">
            <div>
                <h1 className="font-semibold text-xl">Descrição:</h1>
                <p>{descricao}</p>
                <p>Data: {data}</p>
                <p>Tipo: {tipo}</p>
            </div>

            <button onClick={() => onDeletar(id)}>
                <Trash2 className="inline text-gray-700"/>
            </button>
        </CardBase>
    );
}