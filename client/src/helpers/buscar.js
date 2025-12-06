export function buscar(dados, campo, valor) {
    let resultado = dados.filter(item => item[campo].toLowerCase().includes(valor.toLowerCase()));
    return resultado;
}