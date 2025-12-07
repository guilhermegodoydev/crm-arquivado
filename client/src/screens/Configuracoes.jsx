import { useConfigsUsuario } from "../context/ConfigsUsuario";

export function Configuracoes() {
    const { config, atualizarConfig } = useConfigsUsuario();
    console.log(config);

    return(
        <>
            <section>
                <h2>Preferências de visualização</h2>

                <div>
                    <label htmlFor="tema">Tema Atual:</label>
                    <select 
                        value={config.tema} 
                        name="tema" 
                        id="tema" 
                        className="ml-1"
                        onChange={(e) => atualizarConfig({ tema: e.target.value })}
                    >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="formatoData">Formato de Datas</label>
                    <select 
                        value={config.formatoData}
                        name="formatoData" 
                        id="formatoData"
                        onChange={(e) => atualizarConfig({ formatoData: e.target.value})}
                    >
                        <option value="DD/MM/AAAA">DD/MM/AAAA</option>
                        <option value="MM/DD/AAAA">MM/DD/AAAA</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="qtItens">Número de itens por página(tabelas/listas)</label>
                    <select 
                        value={config.qtItensPag}
                        name="qtItens" 
                        id="qtItens"
                        onChange={(e) => atualizarConfig({ qtItensPag: e.target.value})}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </section>
        </>
    );
}

//========================================================================================
//
//O NOME DE ALGUNS LEADS ESTÃO IGUAIS, ENTÃO É MELHOR ALTERAR O NOME OU COLOCAR MAIS SOBRENOMES PARA DIFERENCIAR
//Adicioanr Funcionalidade de download de relatórios 
//PERMITIR ALTERAÇÃO DO CAMPO DE STATUS DO CLIENTE
//ADICIONAR VALIDAÇÃO NO CAMPO DE TELEFONE PARA SEGUIR O FORMATO DE TELEFONE
//ADICIONAR EDIÇÃO DE ATIVIDADE DO HISTÓRICO DE ATIVIDADES
//ADICIONAR DARK E LIGHT TEMA
//Refazer página de relatórios
//remover "default" de funções que renderizam páginas(componentes de páginas)
//ADICIONAR TEXTO AOS RELATORIOS E NÃO APENAS TABELAS
//REVER OS MODELOS DE RELATORIOS OFERECENDO DOWNLOAD APENAS DO QUE SÃO UTEIS
//Tranformar código de "card" cliente usado na página de clinetesIndex para exibir os clientes no lugar de uma tabela na versão mobiel por um componente de cardCliente
//
//=========================================================================================