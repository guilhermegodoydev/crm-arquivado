import { useEffect } from "react";

import { useFetch } from "../utils/useFetch";
import { useLocalStorage } from "../utils/useLocalStorage";
import { obterUltimoContatoCliente, calcularTempoComoCliente } from "../../services/cliente_service";
import { calcularIdade } from "../../helpers/calcularIdade";

function normalizarCliente(cliente) {
    return {
        ...cliente,
        idade: calcularIdade(cliente.dataNascimento),
        ultimoContato: obterUltimoContatoCliente(cliente.atividades),
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
                        atividades: [...(cli.atividades || []), novaAtividade],
                        ultimoContato: obterUltimoContatoCliente([...(cli.atividades || []), novaAtividade])
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