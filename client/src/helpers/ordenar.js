export function ordenar(dados, campo, tipo) {
    if (!dados)
        return "";

    const dadosOrdenados = [...dados]?.sort((a,b) => {
        const valorA = a[campo];
        const valorB = b[campo];

        if (typeof valorA === "string" && typeof valorB === "string") {
            return tipo === "asc" ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
        }
        
        return tipo === "asc" ? valorA - valorB : valorB - valorA;
    });

    return dadosOrdenados;
}