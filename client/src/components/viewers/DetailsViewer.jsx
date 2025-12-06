import { Fragment, useState } from "react";

import { CardBase } from "../cards/CardBase";
import { useMediaQuery } from "react-responsive";

export function DetailsViewer({ editando, campos, onSalvar, onCancelar }) {
    const isMobile = useMediaQuery({ maxWidth: 1023});
    const [ temp, setTemp ] = useState({});
    let primeiroCampoEspecial = false;

    const editarDados = (campo, valor) => {
        setTemp(prev => ({
            ...prev,
            [campo]: valor
        }));
    };

    const cancelar = () => {
        setTemp({});
        onCancelar();
    };

    const salvar = (e) => {
        e.preventDefault();
        onSalvar(temp);
        setTemp({});
    };

    const pegarValor = (campo) => {
        return temp[campo.chave] ?? campo.valor;
    };

    return (
        <CardBase className="col-span-2"> 
            <h1 className="text-2xl mb-4">Informações</h1>

            <form onSubmit={salvar} className="flex flex-col lg:grid grid-cols-2 grid-rows-auto gap-5">
                { isMobile ? <hr className="border-gray-300"/> : ""}

                {campos.map(campo => {

                    const valor = pegarValor(campo);

                    if (campo.especial) {
                        const mostrarHr = !primeiroCampoEspecial;
                        primeiroCampoEspecial = true;
                        
                        return (
                            <Fragment key={campo.chave}>
                                {mostrarHr && isMobile ? <hr className="border-gray-300"/> : null}
                                <div className="col-span-2">
                                    <h2 className="text-lg">{campo.label}</h2>

                                    <textarea
                                        name={campo.chave}
                                        value={valor}
                                        disabled={!editando}
                                        onChange={(e) => editarDados(campo.chave, e.target.value)}
                                        className="text-gray-800 w-full resize-none" 
                                    />
                                </div>
                            </Fragment>
                        );
                    }
                    
                    return (
                        <div key={campo.chave}>
                            <label
                                htmlFor={`campo-${campo.chave}`}
                                className="block text-gray-500"
                            >
                                {campo.label}
                            </label>

                            {campo.opcoes ? (
                                <select
                                    id={`campo-${campo.chave}`}
                                    name={campo.chave}
                                    value={valor}
                                    disabled={!editando}
                                    onChange={(e) => editarDados(campo.chave, e.target.value)}
                                    className={`font-semibold ${editando ? "border rounded-md px-1" : "appearance-none"}`}
                                >
                                    {campo.opcoes.map(o => (
                                        <option key={o.valor} value={o.valor}>
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    id={`campo-${campo.chave}`}
                                    name={campo.chave}
                                    type={campo.tipo}
                                    max={campo.max}
                                    min={campo.min}
                                    value={valor}
                                    disabled={!editando}
                                    onChange={(e) => editarDados(campo.chave, e.target.value)}
                                    autoComplete={campo.autoComplete}
                                    placeholder={campo.placeholder}
                                    required
                                    className={`font-semibold ${editando ? "border rounded-md px-1" : ""}`}
                                />
                            )}
                        </div>
                    );
                })}

                {editando && (
                    <div className="space-x-2 col-span-2 mt-4">
                        <button
                            type="submit"
                            className="bg-green-300 p-1 rounded-sm w-[100px] focus:bg-green-400"
                        >
                            Salvar
                        </button>

                        <button
                            type="button"
                            onClick={cancelar}
                            className="bg-red-300 p-1 rounded-sm w-[100px] focus:bg-red-400"
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </form>
        </CardBase>
    );
}