export function Relatorios() {
    return (
        <section>
            <h1>Modelos</h1>

            <form>                
                <ul>
                    <li>
                        <label htmlFor="">Lista Completa de Leads</label>
                        <input type="radio" name="modelo" id="relatorioLead" />
                    </li>
                    <li>
                        <label htmlFor="">Lista Completa de Clientes</label>
                        <input type="radio" name="modelo" id="relatorioClientes" />
                    </li>
                    <li>
                        <label htmlFor="">Relatório de Negócios</label>
                        <input type="radio" name="modelo" id="relatorioNegocios" />
                    </li>
                    <li>
                        <label htmlFor="">Relatório de analise por localidade</label>
                        <input type="radio" name="modelo" id="relatorioPorLocalidade" />
                    </li>
                    <li>                    
                        <label htmlFor="">Analise de responsaveis</label>
                        <input type="radio" name="modelo" id="relatorioResponsaveis" />
                    </li>
                </ul>

                <button type="submit" className="bg-gray-300 rounded-md px-2">Imprimir</button>
            </form>
        </section>
    );
}