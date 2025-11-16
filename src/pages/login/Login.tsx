import { Link, useNavigate } from "react-router-dom";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";

function Login() {

    //Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado para receber os dados do usuario login
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);


    //Desetruturação de objeto para pegar só uma parte do objeto
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);



    // Envia o usuario para a home
    useEffect( () => {
        if(usuario.token !== ""){
            navigate('/home')        
        }
    }, [usuario])


    //Função Atualizar Estado
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
        //Target (alvo): evento.alvo.nome :recebe evento.doalvo.do valor que digitou  
        //e: a variavel "e" que permite saber quem disparou a função.
    }

    //Função para atualizar login
    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    //Testar no console do Navegador:
    console.log(JSON.stringify(usuarioLogin));


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
                <form className="flex justify-center items-center flex-col w-1/2 gap-4"
                    onSubmit={login}
                >
                    <h2 className="text-5xl font-bold title-font text-red-800 text-shadow2">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="bflex-1 border-2 border-gray-400 rounded p-2 text-gray-400"
                            //atualizar
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="flex-1 border-2 border-gray-400 rounded p-2 text-gray-400"
                            //atualizar
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="bg-dark-900 text-gray-800 hover:bg-gray-900 hover:text-white font-semibold py-2 px-30 rounded-xl shadow-md cursor-pointer transition duration-300"
                    >

                        {/* Animação de carregamento de página */}
                        {
                            isLoading ?
                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                />
                                :
                                <span>Entrar</span>
                        }

                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center">
                </div>
            </div>
        </>
    );
}

export default Login;
