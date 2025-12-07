export function mascaraTelefone(telefone) {
    let valor = telefone;
    
    if (valor.length > 10) { 
        valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (valor.length > 9) {
        valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (valor.length > 8) {
        valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return valor;
}

export function validarTelefone(telefone) {
    const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
    return !regexTelefone.test(telefone);
}