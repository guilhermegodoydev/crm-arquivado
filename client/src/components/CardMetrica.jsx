import { useEffect, useState } from "react";
import { CardBase } from "./CardBase";

const easeInOut = (t) => (t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t);

export function CardMetrica({ titulo, valor, taxaCrescimento, className, duracao = 2000}) {
    const [contador, setContador] = useState(0);

    useEffect(() => {
        let iniciarTimer = null;

        const etapa = (tempo) => {
            if (!iniciarTimer) iniciarTimer = tempo;
            const progresso = Math.min((tempo - iniciarTimer) / duracao, 1);
            const progressoAnimacao = easeInOut(progresso);
            setContador(Math.floor(progressoAnimacao * valor));
            if (progresso < 1) {
                requestAnimationFrame(etapa);
            }
        };

    requestAnimationFrame(etapa);
  }, [valor, duracao]);

    const positivo = taxaCrescimento >= 0;
    const crescimento = (positivo ? '+': '') + taxaCrescimento + '% em comparação ao último mês';
    const formatado = contador.toLocaleString();

    return (
        <CardBase className="flex flex-col items-center justify-center">
            <h2>{titulo}</h2>
            <div className={`${className} border-3 flex items-center justify-center rounded-full mt-4 bg-gray-100 ${positivo ? "border-green-500" : "border-red-500"}`}>
                <p className="text-4xl font-bold">{formatado}</p>
            </div>
            <p>{crescimento}</p>
        </CardBase>
    );
}