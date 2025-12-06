export async function ExRequisicao(url, opcoes = {}, parametros = {}) {
    let urlParametros = "";
    const config = { ...opcoes };

    if (Object.keys(parametros).length !== 0) {
        urlParametros = Object.entries(parametros)
            .map(([chave, valor]) => `${encodeURIComponent(chave)}=${encodeURIComponent(valor)}`)
            .join("&");
    }

    if (config.body && !config.headers?.['Content-Type']) {
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json'
        };

        if (typeof config.body === 'object') 
            config.body = JSON.stringify(config.body);
    }

    const urlCompleta = urlParametros ? `${url}?${urlParametros}` : url;

    const resposta = await fetch(urlCompleta, config);
    const dados = await resposta.text();

    if(!resposta.ok) {
        let mensagem = "";
        switch (resposta.status) {
            case 400: mensagem = "Requisição inválida (400)"; break;
            case 401: mensagem = "Não autorizado (401)"; break;
            case 403: mensagem = "Acesso negado (403)"; break;
            case 404: mensagem = "Recurso não encontrado (404)"; break;
            case 500: mensagem = "Erro no servidor (500)"; break;
            default: mensagem = `Erro: ${resposta.status}`;
        }
        throw new Error(dados ? `${mensagem}-${dados}`: mensagem);

    }

    try {
        return JSON.parse(dados);
    } catch {
        return dados;
    }
}