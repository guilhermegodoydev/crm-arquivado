const tipoAtividades = [
    { key: "ligacao", label: "Ligação"},
    { key: "email", label: "Email"},
    { key: "reuniao", label: "Reunião"}
];

export function FormAtividade({ onSalvar, onFechar }) {
    const maxData = new Date().toISOString().split("T")[0];

    return (
        <form onSubmit={onSalvar} className="space-y-3">
            <div className="mt-3">
                <label htmlFor="data">Data:</label>
                <input type="date" max={maxData} name="data" id="data" className="border rounded-md px-1 ml-5" required/>
            </div>

            <div>
                <label htmlFor="tipo">Tipo:</label>
                <select name="tipo" id="tipo" className="border rounded-md px-1 min-w-[38%] ml-5" required>
                    {tipoAtividades.map( opt => (
                        <option key={`opcao-${opt.key}`} value={opt.key}>{opt.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="descricao" className="block">Descrição:</label>
                <textarea 
                    id="descricao" 
                    name="descricao" 
                    className="resize-none mb-2 border rounded-md px-2 block w-full" 
                    placeholder="Discussão sobre integrações..."
                    required
                    ></textarea>
            </div>

            <div className="flex gap-3">
                <button className="bg-green-300 p-2 rounded-sm w-1/2" type="submit">Confirmar</button>
                <button className="bg-red-300 p-2 rounded-sm w-1/2" type="button" onClick={onFechar}>Cancelar</button>
            </div>
        </form>
    );
}