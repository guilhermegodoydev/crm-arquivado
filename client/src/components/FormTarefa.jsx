import { Input } from "../components/Input";

export function FormTarefa() {

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 mt-5">
            <Input label="Nome"/>
            <Input label="Data Limite"/>
            <Input label="Descrição"/>
            <Input label="Cliente"/>
            
            <button type="submit" className="bg-blue-600 text-white px-2 rounded w-full">Salvar</button>
        </form>
    );
};