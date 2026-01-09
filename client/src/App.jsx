import { Outlet, useMatches } from "react-router-dom";
import { MenuLateral } from "./components/layout/MenuLateral";
import { AlertaProvider } from "./context/AlertaContexto";
import { ConfigProvider } from "./context/ConfigsUsuario";

function App() {
    const matches = useMatches();

    const titulo = [...matches].at(-1)?.handle?.title || "";

    return (
        <ConfigProvider>
            <AlertaProvider>
                <div className="flex overflow-x-hidden">
                    <MenuLateral/>   
                    <main className="ml-14 flex flex-col flex-1 p-4 min-h-screen">
                        {titulo && 
                            <>
                                <h1>{titulo}</h1>
                                <hr className="border-1 border-gray-100 mb-3"/>
                            </>
                        }
                        <Outlet/>
                    </main>
                </div>
            </AlertaProvider>
        </ConfigProvider>
    )
}

export default App;