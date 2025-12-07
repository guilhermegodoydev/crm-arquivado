export function obterUltimoContatoCliente(ativiadesCliente) {
    console.log(ativiadesCliente);
    if (ativiadesCliente.length === 0) {
        return "Nenhuma atividade registrada";
    }

    let ultimoContato = "";

    ativiadesCliente.forEach(atv => {
        ultimoContato = atv.data > ultimoContato ? atv.data : ultimoContato;
    });

    return ultimoContato;
}

export function calcularTempoComoCliente(dataCriacao) {
    const diferencaDatas = Date.now() - new Date(dataCriacao).getTime();
    const diferencaDias = Math.floor(diferencaDatas / 86400000);

    if (diferencaDias === 0) return "Cadastrado Hoje";
    if (diferencaDias === 1) return "Cadastrado Ontem";
    if (diferencaDias < 30) return `Cadastrado a ${diferencaDias} dias`;

    const meses = Math.floor(diferencaDias / 30);
    if (meses === 1 ) return "Cliente há 1 mês";
    if (meses < 12 ) return `Cliente há ${meses}`;

    const anos = Math.floor(diferencaDias / 365);
    return anos === 1 ? "Cliente há 1 ano" : `Cliente há ${anos} anos`
}