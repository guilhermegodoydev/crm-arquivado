import { useCliente } from "../../hooks/dominio/useCliente";

const empresa = {
    id: 1,
    nomeEmpresa: "Castro & Lima Consultoria",
    cnpj: "95.191.106/0001-26",
    endereco: {
        rua: "Av. Paulista",
        numero: 1234,
        bairro: "Bela Vista",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01310-100"
    },
    telefone: "(11) 98765-4321",
    email: "contato@castrolima.com.br",
    setor: "Consultoria Empresarial",
    numeroFuncionarios: 25,
    faturamentoAnual: 1500000,
    clientesAtivos: 48,
    ultimosNegocios: [
        { cliente: "Empresa Alpha", valor: 50000, data: "2025-11-15" },
        { cliente: "Beta Ltda", valor: 120000, data: "2025-10-28" },
        { cliente: "Gama Comércio", valor: 75000, data: "2025-10-10" }
    ]
};

export function RelatorioClientes() {
    const { clientes } = useCliente();
    console.log(clientes[0].tempo);

    const formatarLocalidade = (localidade) => {
        return localidade.cidade + ", " + localidade.estado;
    };

    const gerarEstiloStatus = (status) => {
        if (status === "ativo")
            return "bg-green-200";

        if (status === "inativo")
            return "bg-red-200";
    };

    const colunas = [
        {titulo: "Nome", chave: "nome"},
        {titulo: "Categoria", chave: "categoria"},
        {titulo: "NF", chave: "negociosFechados", estilo: "text-center"},
        {titulo: "UC", chave: "ultimoContato", estilo: "text-center"},
        {titulo: "Tempo", chave: "tempo"},
        {titulo: "VTC", chave: "valorTotalComprado"},
        {titulo: "Status", chave: "status", estilo: "text-center"}
    ];

    return (
        <section className="p-1">
            <h1>Lista Completa de Clientes</h1>

            <table className="border w-full print:table-fixed print:text-sm print:w-full">
                <thead className="bg-gray-200">
                    <tr>
                        {colunas.map(c => (
                            <th className="border" key={c.titulo}>{c.titulo}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cli => (
                        <tr key={cli.id}>
                            {colunas.map(c => (
                                <td 
                                    key={cli.id} 
                                    className={`border pl-2 ${c.chave === "status" ? `${c.estilo} + ${gerarEstiloStatus(cli[c.chave])}` : c.estilo}`}
                                >
                                    {c.chave === "localidade" ? formatarLocalidade(cli[c.chave]) : cli[c.chave]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className="text-md font-bold">Legenda:</p>
            <div className="text-sm">
                <ul>
                    <li>NF - Negócios Fechados</li>
                    <li>UC - Último Contato</li>
                    <li>VTC - Valor Total Comprado</li>
                </ul>
            </div>
        </section>
    );
}