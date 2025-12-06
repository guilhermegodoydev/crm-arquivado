import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";

import { Tabela } from "../../components/tabela/TabelaBase";
import { Modal } from "../../components/Modal";
import { Filtro } from "../../components/Filtro";
import { NotasViewer } from "../../components/viewers/NotasViewer";
import { DetailsViewer } from "../../components/viewers/DetailsViewer";
import { HeaderDetalhesCliente } from "../../components/HeaderDetalhesCliente";

import { useCliente } from "../../hooks/dominio/useCliente";
import { useAlerta } from "../../context/AlertaContexto";
import { filtrar } from "../../utils/filtrar";
import { useMediaQuery } from "react-responsive";
import { CardAtividade } from "../../components/cards/CardAtividade";
import { FormAtividade } from "../../components/FormAtividade";
import { useModal } from "../../hooks/ui/useModal";

export function ClienteDetalhes() {
    const { id } = useParams();
    const { carregando, erro, buscar, atualizar, remover, editarNota: edNota, salvarNota: slNota, removerNota: rmNota, salvarAtividade } = useCliente();
    const [ cliente, setCliente ] = useState(null);
    const { exibirAlerta } = useAlerta();
    const isMobile = useMediaQuery({ maxWidth: 1023 });

    const { modal, abrir: abrirModal, fechar: fecharModal, atualizar: atualizarModal, confirmarAcao } = useModal();
    const [ editandoDados, setEditandoDados ] = useState(false);
    const [ dadosCliente, setDadosCliente ] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const cliente = buscar(id);
        
        if (cliente)
        {
            setDadosCliente(cliente);
            setCliente(cliente);
        }
    }, []);

    if (carregando) return <p>Carregando...</p> ;
    if (!cliente) return <p>Cliente não encontrado</p>;
    if (erro) return <p>Erro ao buscar o cliente</p>;

    let anoAtual = new Date().getFullYear();

    const colunas = [
        { chave: "data", label: "Data", ordenavel: true, tipo: "numero" },
        { chave: "tipo", label: "Tipo", ordenavel: false, tipo: "texto" },
        { chave: "descricao", label: "Descrição", ordenavel: false, tipo: "texto" },
        { chave: "acoes", label: "Ações", ordenavel: false, className: "text-center",
            children: (atividade) => (
                <button
                    onClick={() => confirmarExcluirAtividade(atividade.id)}
                    aria-label={`Deletar atividade`}
                    title={`Clique para deletar a atividade`}
                    className="inline-flex rounded cursor-pointer text-gray-600" 
                >
                    <Trash2/>
                </button>
            )
        }
    ];

    const idadeMinima = 18;
    const anoMinimo = anoAtual - idadeMinima;
    let dataMax = new Date();
    dataMax.setFullYear(anoMinimo);
    dataMax = dataMax.toISOString().split("T")[0];

    const camposFormCli = [
        { label: "Nome", chave: "nome", valor: dadosCliente.nome, tipo: "text", autoComplete: "name"},
        { label: "Email", chave: "email", valor: dadosCliente.email, tipo: "email", autoComplete: "email"},
        { label: "Telefone", chave: "telefone", valor: dadosCliente.telefone, tipo: "tel", autoComplete: "tel", placeholder:"(XX) XXXX-XXXX"},
        { label: "Data Nascimento", chave: "dataNascimento", valor: dadosCliente.dataNascimento, tipo: "date", autoComplete: "birthdate", max: dataMax},
        { label: "Tipo", chave: "tipo", valor: dadosCliente.tipo, opcoes: [
            { label: "Pessoa Jurídica", valor: "PJ" },
            { label: "Pessoa Física", valor: "PF" }
        ]},
        { label: "Categoria", chave: "categoria" , valor: dadosCliente.categoria, opcoes: [
            { label: "Vip", valor: "vip" },
            { label: "Regular", valor: "regular"}
        ]},
        { label: "Resumo do Relacionamento", chave: "resumoRelacionamento", valor: dadosCliente.resumoRelacionamento, tipo: "text", especial: true},
        { label: "Observação", chave: "observacao", valor: dadosCliente.observacao, tipo: "text", especial: true} 
    ];
    
    const salvarDados = (dados) => {
        if (Object.keys(dados).length == 0) {
            setEditandoDados(false);
            return;
        }

        let dadosFinal = dados;
        let anoNascimento = new Date(dados.dataNascimento).getFullYear();

        if (dados.dataNascimento) {
            dadosFinal.idade = anoAtual - anoNascimento;
        }

        atualizar(id, dados);
        setDadosCliente(prev => ({
            ...prev,
            ...dadosFinal
        }));
        setEditandoDados(false);
    };
    
    const confirmarExcluirAtividade = (idAtividade) => {
        abrirModal({
            acao: () => excluirAtividade(idAtividade),
            aberto: true,
            mensagem: "Tem certeza que deseja excluir esse registro?",
        });
    }
    
    const excluirAtividade = (idAtividade) => {
        const atividadesNovas = dadosCliente.atividades.filter(a => a.id != idAtividade);
        const ultimoContato = atividadesNovas.length > 0 ? atividadesNovas[0].data : "Nenhuma atividade registrada";

        setDadosCliente(prev => ({
            ...prev,
            atividades: atividadesNovas,
            ultimoContato: ultimoContato
        }));
        atualizar(id, {
            ...dadosCliente,
            atividades: atividadesNovas,
            ultimoContato: ultimoContato
        });

        fecharModal();
    };
    
    const confirmarCriarAtividade = (e) => {
        e.preventDefault();
        const formData = new FormData (e.target);
        const atividade = Object.fromEntries(formData);
        
        atividade.id = crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
        salvarAtividade(id, atividade);
        
        fecharModal();
        setDadosCliente(prev => ({
            ...prev,
            atividades: [atividade, ...(prev.atividades || [])]
        }));
        
    };
    
    const criarAtividade = () => {
        abrirModal({
            aberto: true,
            acao: null,
            children: <FormAtividade 
                onSalvar={(e) => confirmarCriarAtividade(e)} 
                onFechar={fecharModal}
            />,
        });
    };
    
    const excluirUsuario = () => {
        remover(id);
        navigate("/clientes");
        exibirAlerta(`Cliente ${dadosCliente.nome} excluído com sucesso`,"sucesso");
    };

    const confirmarExcluirUsuario = () => {
        abrirModal({
            acao: excluirUsuario,
            aberto: true,
            mensagem: `Tem certeza que deseja excluir ${dadosCliente.nome}`,
        });
    };

    const removerNota = (notaId) => {
        fecharModal();
        
        setDadosCliente(prev => ({
            ...prev,
            notas: prev.notas.filter(n => n.id != notaId)
        }));
        
        rmNota(id, notaId);
    };

    const confirmarExcluirNota = (notaId) => {
        abrirModal({
            acao: () => removerNota(notaId),
            aberto: true,
            mensagem: "Tem certeza que deseja excluir essa nota? Essa ação não pode ser revertida."
        });
    };

    const salvarNota = (nota) => {
        const existe = dadosCliente.notas.some(n => n.id == nota.id);
        
        if (existe) 
            {
                setDadosCliente(prev => ({
                    ...prev,
                    notas: prev.notas.map(n => n.id == nota.id ? nota : n)
                }));
                edNota(id, nota);
            }   
        else {
            setDadosCliente(prev => ({
                ...prev,
                notas: [nota, ...prev.notas]
            }));
            slNota(id, nota);
        }
    };

    const filtrarAtividades = (valor) => {
        const dadosFiltrados =  filtrar([...cliente.atividades], {"tipo": valor});
        setDadosCliente(prev => ({
            ...prev,
            atividades: dadosFiltrados
        }));
    };

    return (
        <>
            <Modal 
                aberto={modal.aberto} 
                onFechar={fecharModal} 
                mensagem={modal.mensagem}
                titulo={modal.titulo}
            >
                {modal.children ? 
                    modal.children
                    :
                    <div className="flex gap-3">
                        <button className="bg-green-300 p-2 rounded-sm w-1/2" onClick={confirmarAcao}>Confirmar</button>
                        <button className="bg-red-300 p-2 rounded-sm w-1/2" onClick={fecharModal}>Cancelar</button>
                    </div>
                }
            </Modal>

            <HeaderDetalhesCliente
                clienteParcial={{
                    nome: dadosCliente.nome,
                    idade: dadosCliente.idade,
                    status: dadosCliente.status,
                    ultimoContato: dadosCliente.ultimoContato
                }}
                onEditar={() => setEditandoDados(true)}
                onAddAtividade={criarAtividade}
                onExcluir={confirmarExcluirUsuario}
            />
            
            <section className="flex flex-col lg:grid grid-cols-3 gap-10 my-7">
                <DetailsViewer
                    campos={camposFormCli}
                    editando={editandoDados}
                    onCancelar={() => setEditandoDados(false)}
                    onSalvar={salvarDados}
                />

                <NotasViewer 
                    notas={dadosCliente.notas} 
                    onSalvar={(nota) => salvarNota(nota)}
                    onExcluir={confirmarExcluirNota}
                />
            </section>
            
            <section>
                <h2>Histórico de Atividades</h2>
                <Filtro 
                    id="filtro-atividades" 
                    nome="filtro-atividades" 
                    label="Tipo" 
                    onChange={(e) => filtrarAtividades(e.target.value)}
                    opcoes={[
                        {texto: "Não Filtrar", valor: ""},
                        {texto: "Email", valor: "email"},
                        {texto: "Ligação", valor: "ligação"},
                        {texto: "Reunião", valor: "reunião"}
                    ]}
                />

                <div className="space-y-4 mt-4">    
                    {isMobile ?
                        dadosCliente.atividades.length > 0 ?
                            dadosCliente.atividades.map(at => (
                                <CardAtividade 
                                    key={at.id}
                                    id={at.id}
                                    data={at.data}
                                    tipo={at.tipo}
                                    descricao={at.descricao}
                                    onDeletar={confirmarExcluirAtividade}
                                />
                            ))
                            :
                            <p>O cliente não tem atividades registradas.</p>
                        :
                        <Tabela 
                            colunas={colunas}
                            dadosTabela={dadosCliente.atividades} 
                        />
                    }
                </div>
            </section>
        </>
    );
}