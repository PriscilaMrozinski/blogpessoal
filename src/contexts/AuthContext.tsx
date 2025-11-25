import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Services";
import { ToastAlerta } from "../utils/ToastAlerta";


// Objetivo da Context: manipular login temporariamente

// Criar Interface
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void // sair do sistema
    handleLogin(usuario: UsuarioLogin): Promise<void> // login no sistema
    isLoading: boolean //carregar a animação
}

// Qualquer componente React pode utilizar o context:
interface AuthProviderProps {
    children: ReactNode
}

// Inicializar o Estado usuario (Guardar os dados do usuario autenticado)
export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    // Inicializar o Estado isLoading (Exibir e Ocultar o loder ni Formulario de login)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //Implementação da Função de logon  (Autenticar no Backend)
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true);

        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario);
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso") 
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
        }

        setIsLoading(false); //descarregar a animação
    }

    //Implementação da Função Logout (limpa os dados do usuário)
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return(
        <AuthContext.Provider value={{usuario, handleLogin, handleLogout, isLoading}}>
            {children}            
        </AuthContext.Provider>
    )
}