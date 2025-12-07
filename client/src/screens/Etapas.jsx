import { useState } from "react";
import { X } from "lucide-react";
import { 
  DndContext, 
  useSensor, 
  useSensors, 
  PointerSensor, 
  closestCorners
} from "@dnd-kit/core";

import { Coluna } from "../components/kanban/Coluna";
import { LeadArastavel } from "../components/kanban/LeadArastavel";

import { useLeadEtapa } from "../hooks/derivados/useLeadEtapa";

export function Etapas() {
  const { leadsPorEtapa, moverLeadParaEtapa, carregando, erro} = useLeadEtapa();
  const [ leadSelecionado, setLeadSelecionado ] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro ao carregar dados.</p>;
  if (!leadsPorEtapa || leadsPorEtapa.length === 0) return <p>Nenhum dado disponível.</p>;

  const handleDragEnd = (e) => {
    const {active, over} = e;
    if (!over) return;

    const origem = active.data.current.etapaId;
    const destino = over.id;

    if (origem === destino) return;

    const leadId = active.data.current.leadId;
    moverLeadParaEtapa(leadId, destino);
  };

  const estilosInfos = "text-gray-700 w-1/2";
  const estilosInfosValores = "text-gray-700 font-medium max-w-1/2";
  const estiloBotao = "bg-blue-400 w-full rounded-md text-white mt-3";  

  return (
    <>
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCorners} 
        onDragEnd={handleDragEnd}
      >
        <section className="grid grid-flow-col auto-cols-[250px] gap-8 overflow-x-auto max-h-[88vh]">
          {leadsPorEtapa.map(etapa => (
            <Coluna key={etapa.id} id={etapa.id}>
              <h2 className="text-center text-white bg-blue-500 rounded-md mb-5">
                {etapa.nome} ({etapa.leads.length})
              </h2>
              <ul>
                {etapa.leads.map(lead => (
                  <LeadArastavel
                    key={lead.id}
                    lead={lead}
                    etapaId={etapa.id}
                    onClick={() => setLeadSelecionado(lead)}
                  />
                ))}
              </ul>
            </Coluna>
          ))};
        </section>
      </DndContext>

      {leadSelecionado && 
        <div className="absolute right-10 bottom-0 bg-white w-2/8 p-4 shadow-md rounded-t-xl">
          <div className="flex justify-between">
            <h3>Informações do Lead</h3>
            <button onClick={() => setLeadSelecionado(null)}>
              <X/>
            </button>
          </div>
          <hr className="border-gray-300"/>
          <ul>
            <li className="flex mb-1">
              <p className={estilosInfos}>Email</p>
              <span className={estilosInfosValores}>{leadSelecionado.nome}</span>
            </li>

            <li className="flex mb-1">
              <p className={estilosInfos}>Telefone</p>
              <span className={estilosInfosValores}>{leadSelecionado.telefone}</span>
            </li>

            <li className="flex mb-1">
              <p className={estilosInfos}>Origem</p>
              <span className={estilosInfosValores}>{leadSelecionado.origem}</span>
            </li>

            <li className="flex mb-1">
              <p className={estilosInfos}>Último Contato</p>
              <span className={estilosInfosValores}>{leadSelecionado.ultContato}</span>
            </li>

            <li className="flex mb-1">
              <p className={estilosInfos}>Empresa</p>
              <span className={estilosInfosValores}>{leadSelecionado.empresa}</span>
            </li>
          </ul>

          <div>
            <button className={estiloBotao}>Editar</button>
            <button className={estiloBotao}>Deletar</button>
          </div>
        </div>
      }
    </>
  );
}