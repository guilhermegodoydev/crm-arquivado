import { useEffect } from "react";

import { useFetch } from "../helpers/useFetch";
import { useLocalStorage } from "../helpers/useLocalStorage";
import { ordenar } from "../../utils/ordenar";

function calcularIdade(dataNascimento) {
    if (!dataNascimento) return null;
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

function calcularTempoComoCliente(dataCriacao) {
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

function normalizarCliente(cliente) {
    const atividadesOrdenadas = ordenar(cliente.atividades, "data", "number");
    const atividadeMaisRecente = atividadesOrdenadas[0].data;

    return {
        ...cliente,
        idade: calcularIdade(cliente.dataNascimento),
        ultimoContato: atividadeMaisRecente,
        tempo: calcularTempoComoCliente(cliente.dataCriacao),
    };
}

export function useCliente() {
    const { dados: mock, carregando, erro } = useFetch("/mock/clientes.json");
    const [ clientes, setClientes ] = useLocalStorage("clientes", []);

    useEffect(() => {
        if (!carregando && !erro && clientes.length === 0 && mock) {
            const normalizados = mock.map(c => normalizarCliente(c));
            setClientes(normalizados);
        }
    }, [mock, carregando, erro]);


    const criar = (cliente) => {
        const clienteNormalizado = normalizarCliente({
            id: crypto.randomUUID(),
            ...cliente
        });

        setClientes(prev => [...prev, clienteNormalizado]);
    };

    const atualizar = (id, clienteParcial) => {
        setClientes(prev =>
            prev.map(c =>
                c.id == id
                    ? normalizarCliente({ ...c, ...clienteParcial })
                    : c
            )
        );
    };

    const remover = (clienteId) => {
        setClientes(prev => prev.filter(c => c.id != clienteId));
    };

    const buscar = (clienteId) => {
        const cli = clientes.find(c => c.id == clienteId);

        if (!cli) {
            throw {
                status: 404,
                statusText: "Cliente não encontrado",
                message: "O cliente informado não existe ou foi movido.",
            };
        }

        return cli;
    };

    const salvarNota = (clienteId, nota) => {
        setClientes(prev =>
            prev.map(c =>
                c.id == clienteId
                    ? {
                        ...c,
                        notas: [
                            ...(c?.notas?.filter(n => n.id != nota.id) || []),
                            nota
                        ]
                    }
                    : c
            )
        );
    };

    const removerNota = (clienteId, notaId) => {
        setClientes(prev =>
            prev.map(cli =>
                cli.id == clienteId
                    ? {
                        ...cli,
                        notas: Array.isArray(cli.notas)
                            ? cli.notas.filter(n => n.id != notaId)
                            : [],
                    }
                    : cli
            )
        );
    };

    const editarNota = (clienteId, nota) => {
        setClientes(prev =>
            prev.map(cli =>
                cli.id == clienteId
                    ? {
                        ...cli,
                        notas: cli.notas.map(n => n.id == nota.id ? nota : n)
                    }
                    : cli
            )
        );
    };

    const removerAtividade = (clienteId, atividadeId) => {
        setClientes(prev =>
            prev.map(cli =>
                cli.id == clienteId
                    ? {
                        ...cli,
                        atividades: Array.isArray(cli.atividades)
                            ? cli.atividades.filter(ati => ati.id != atividadeId)
                            : [],
                    }
                    : cli
            )
        );
    };

    const salvarAtividade = (idCliente, novaAtividade) => {
        setClientes(prev =>
            prev.map(cli =>
                cli.id == idCliente
                    ? {
                        ...cli,
                        atividades: [...(cli.atividades || []), novaAtividade]
                    }
                    : cli
            )
        );
    };

    return {
        clientes,
        carregando,
        erro,
        criar,
        atualizar,
        remover,
        buscar,
        salvarNota,
        editarNota,
        removerNota,
        salvarAtividade,
        removerAtividade
    };
}