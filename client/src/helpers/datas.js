export function formatarData(data, formato) {
    let dataFormatada = "";

    const dataObj = new Date(data);
    let dia = dataObj.getDate();
    let mes = dataObj.getMonth() + 1;
    let ano = dataObj.getFullYear();

    dia = dia < 10 ? `0${dia}` : dia;
    mes = mes < 10 ? `0${mes}` : mes;

    if (formato === "DD/MM/AAAA") {
        dataFormatada = `${dia}/${mes}/${ano}`;
    }
    else if (formato === "MM/DD/AAAA") {
        dataFormatada = `${mes}/${dia}/${ano}`;
    }

    return dataFormatada;
}