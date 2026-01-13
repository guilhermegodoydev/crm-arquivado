import { StrictMode } from "react";
import { createRoot } from "react-dom/client"
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx"

import { Dashboard } from "./screens/Dashboard.jsx";
import { ClientesIndex } from "./screens/clientes/ClientesIndex.jsx";
import { Etapas } from "./screens/Etapas.jsx";
import { ClientesBase } from "./screens/clientes/ClientesBase.jsx";
import { ClienteDetalhes } from "./screens/clientes/ClienteDetalhes.jsx";
import { PaginaErro } from "./screens/PaginaErro.jsx";
import { Configuracoes } from "./screens/Configuracoes.jsx";
import { TarefasGeral } from "./screens/TarefasGeral.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <PaginaErro/>,
    children: [
      {
        path: "/",
        element: <Dashboard/>,
        handle: { title: "Dashboard"}
      },
      {
        path: "/clientes",
        element: <ClientesBase/>,
        children: [
          { index: true, element: <ClientesIndex/>, handle: { title: "Clientes"}},
          { path: ":id", element: <ClienteDetalhes/>, handle: { title: ""}}
        ]
      },
      {
        path: "/etapas",
        element: <Etapas/>,
        handle: { title: "Etapas" }
      },
      {
        path: "/configuracoes",
        element: <Configuracoes/>,
        handle: { title: "Configurações"}
      },
      {
        path: "/tarefas",
        element: <TarefasGeral/>,
        handle: { title: "Minhas tarefas"}
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);