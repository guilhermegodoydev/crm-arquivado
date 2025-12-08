import { ChartPie, Layers, UsersRound, FileText, ListTodo, Settings} from "lucide-react";
import { useState,  } from "react";
import { NavLink } from "react-router-dom";

const itensMenu = [
    {label: "Dashboard", navegateTo: "/", icon: <ChartPie/>, IconOnActive: "chart-pie-active"},
    {label: "Clientes", navegateTo: "/clientes", icon: <UsersRound/> , IconOnActive: "users-round-active"},
    {label: "Etapas", navegateTo: "/etapas", icon: <Layers/>, IconOnActive: "layers-active"},
    {label: "Relatórios", navegateTo: "/relatorios", icon: <FileText/>, IconOnActive: "file-text-active"},
    {label: "Tarefas", navegateTo: "/tarefas", icon: <ListTodo />, IconOnActive: "list-todo-active"},
    {label: "Configurações", navegateTo: "/configuracoes", icon: <Settings/>, IconOnActive: "settings-active"}
];

const transicaoOpacidade = "transition-opacity duration-300 ease-in-out";

export function MenuLateral() {
    const [ onHover, setOnHover ] = useState(false);

    const menuWidth = onHover ? "w-64" : "w-14";
    const opacidadeTexto = onHover ? "opacity-100" : "opacity-0";

    return (
        <aside 
            onMouseEnter={() => setOnHover(true)} 
            onMouseLeave={() => setOnHover(false)} 
            className={`fixed z-2 overflow-hidden h-screen p-2 transition-all duration-500 ease-in-out bg-[#1b4e9b] ${menuWidth}`}
        >
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <div className="flex items-end mb-1">
                                <img src="/logo.png" alt="" className="pt-[16px] w-10"/>
                                {onHover && 
                                    <h2 className={`ml-3 text-white ${opacidadeTexto} ${transicaoOpacidade}`}>NexaFlow</h2>
                                }
                            </div>
                            <hr className="border-t-0.5 border-white pb-2"/>
                        </li>
                        {itensMenu.map(item => (
                            <li key={item.label} className="cursor-pointer text-white p-2 hover:bg-blue-700 hover:font-semibold">
                                <NavLink to={item.navegateTo}>
                                    {({ isActive }) => (
                                        <div className="flex gap-3">
                                            {isActive ?
                                                <img 
                                                    src={`src/assets/icons/menuLateral/${item.IconOnActive}.svg`} 
                                                    className="w-6" 
                                                    alt="Icone ativo"
                                                />
                                                : 
                                                <div className="w-6">
                                                    {item.icon}
                                                </div>
                                            }
                                            
                                            <p className={`border-l-2 pl-3 ${transicaoOpacidade} 
                                                            ${isActive ? "font-semibold" : ""}
                                                            ${opacidadeTexto}
                                                        `}
                                            >
                                                {item.label}
                                            </p>
                                        </div>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
        </aside>
    )   
}