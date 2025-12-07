import { useMediaQuery } from "react-responsive";

import { GraficoBarras } from "../components/graficos/GraficoBarras";
import { GraficoLinhas } from "../components/graficos/GraficoLinhas";
import { GraficoPizza} from "../components/graficos/GraficoPizza";
import { CardMetrica } from "../components/cards/CardMetrica";

import { useFetch } from "../hooks/utils/useFetch";

export function Dashboard() {
    const isMobile = useMediaQuery({ maxWidth: 1024});
    const { dados, carregando, erro} = useFetch("/mock/metricas.json");

    if (carregando) return <div>Carregando...</div>;
    if (erro) return <div>Erro {erro}</div>;
    if (!dados || dados.length === 0) return null;

    const estiloCards = "h-30 w-30 2xl:h-45 2xl:w-45";

    return (
        <section>
            <div className="lg:grid grid-cols-3 grid-rows-2 gap-8 flex flex-col xl:h-[85vh]">
                <CardMetrica 
                    titulo="Novos Leads" 
                    valor={dados.metricas.novosLeads} 
                    taxaCrescimento={15} 
                    className={estiloCards}
                />

                <CardMetrica 
                    titulo="Leads Perdidos" 
                    valor={dados.metricas.leadsPerdidos} 
                    taxaCrescimento={-5} 
                    className={estiloCards}
                />

                <GraficoBarras 
                    className="col-span-1 lg:h-auto h-55"
                    titulo="Etapas de Leads"
                    data={dados.metricas.barra}
                    layout={isMobile ? "horizontal" : "vertical"}
                    eixoYKey={isMobile ? "leads" : "nome"}
                    eixoXkey={isMobile ? "nome" : "leads"}
                    larguraEixoY={isMobile ? 45 : 100}
                    barras={[
                        {id: "barra-leads", dataKey: "leads", stackId: "a", fill: "#1b4e9b"}
                    ]}
                />

                <GraficoLinhas 
                    className="col-span-2 lg:h-58 h-55" 
                    titulo="Novos Leads" 
                    data={dados.metricas.linha} eixoXKey="nome" 
                    larguraEixoY={36}
                    linhas={[
                        {id: "linha-leads", dataKey: "novosLeads", nomeLinha: "Novos Leads", fill: "#1b4e9b"}
                    ]}
                />

                <GraficoPizza 
                    className="lg:h-58 h-75"
                    titulo="Origem dos Leads" 
                    data={dados.metricas.pizza}
                    dataKey="leads" 
                    nameKey="origem"
                />
            </div>
        </section>
    );
}