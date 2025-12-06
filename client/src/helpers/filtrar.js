export function filtrar(dados, filtros) {
    let dadosFiltrados = dados.filter(item => {
        return Object.entries(filtros).every(([campo, valor]) => {
            if (!valor) return true;
            return item[campo]?.toString().toLowerCase() === valor.toString().toLowerCase();
        });
    });

    return dadosFiltrados;
}