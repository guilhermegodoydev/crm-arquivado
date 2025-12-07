import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/utils/useLocalStorage";

const ConfigContexto = createContext();

export function ConfigProvider({ children }) {
    const [ config, setConfig ] = useLocalStorage("configUsuario", {
        tema: "light",
        formatoData: "DD/MM/AAAA",
        qtItensPag: 20,
    });

    const atualizarConfig = (novaConfig) => {
        setConfig(prev => ({
            ...prev,
            ...novaConfig,
        }));
    };

    return (
        <ConfigContexto.Provider value={{ config, atualizarConfig}}>
            {children}
        </ConfigContexto.Provider>
    );
}

export function useConfigsUsuario() {
    return useContext(ConfigContexto);
}