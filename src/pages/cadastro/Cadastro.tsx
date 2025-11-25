import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type Usuario from "../../models/Usuario";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../services/Services";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {

    //Objeto responsável por redirecionar o usuário para uma outra rota
    const navigate = useNavigate();


    //----------------------------------------------------------------
    // CRIAR OS ESTADOS PARA CONECTAR COM O BD:

    //Controlar a exibição do Loader (animação de carregamento):
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //Validar a digitação da senha do usuário:
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    //Guardar os dados do usuario:
    const [usuario, setUsuario] = useState<Usuario>({
        id: 0, // inicializar os atributos
        nome: "",
        usuario: "",
        senha: "",
        foto: ""
    })


    // apos cadastrar, enviar usuario para a tela de login:

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar();
        }
    }, [usuario])

    function retornar() {
        navigate("/");
    }


    //----------------------------------------------------------------

    // Depois dos Estados, temos que conectar o form com o Estado
    // CRIAR FUNÇÂO atualizar ESTADO
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
        //Target (alvo): evento.alvo.nome :recebe evento.doalvo.do valor que digitou  
        //e: a variavel "e" que permite saber quem disparou a função.
    }


    //Função para CONFIRMAR SENHA
    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value);
    }


    // Cadastrar novo Usuário
    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsLoading(true); // carrega a animação

        if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
            try {
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
                ToastAlerta('Usuario cadastrado com sucesso!', 'sucesso')
            } catch (error) {
                ToastAlerta('Erro ao cadastrar o usuário!','erro');
            }

        } else {
            ToastAlerta("Dados do usuário inconsistentes! Verifique as informações do cadastro.", 'erro');
            setUsuario({
                ...usuario,
                senha: ''
            });
            setConfirmarSenha('');
        }

        setIsLoading(false); //para a animação 
    }




    //Testar no console do Navegador:
    console.log(JSON.stringify(usuario));
    console.log("Confirmar Senha: " + confirmarSenha);



    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
            <div
                className="bg-[url('https://i.imgur.com/zFzAmo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"
            >
            </div>
            <div className="flex justify-center items-center flex-col w-2/3 gap-4">
                <h2 className="text-5xl font-bold title-font text-red-900 text-shadow2">Cadastrar</h2>
                <form className="flex flex-col w-full gap-5" onSubmit={cadastrarNovoUsuario}>
                    {/* onSumit: chama a função */}


                    <div className="flex flex-row items-center w-full">
                        <label htmlFor="nome" className="w-22 text-align-center text-gray-800">Nome: </label>
                        <input 
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Nome"
                            className="flex-1 border-2 border-gray-400 rounded p-2 text-gray-400"
                            //atualizar
                            value={usuario.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                    </div>

                    <div className="flex flex-row items-center w-full">
                        <label className="w-22 text-align-center text-gray-800" htmlFor="usuario">Usuario: </label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="flex-1 border-2 border-gray-400 rounded p-2 text-gray-400"
                            //atualizar
                            value={usuario.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <div className="flex flex-row items-center w-full">
                        <label htmlFor="foto" className="w-22 text-align-center text-gray-800">Foto: </label>
                        <input
                            type="text"
                            id="foto"
                            name="foto"
                            placeholder="Foto"
                            className="flex-1 border-2 border-gray-400 rounded p-2 text-gray-400"
                            //atualizar
                            value={usuario.foto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <div className="flex flex-row items-center w-full">
                        <label htmlFor="senha" className="w-22 text-align-center text-gray-800">Senha: </label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="flex-1 border-2 border-gray-400 rounded p-2 text-gray-400"
                            //atualizar, chamar a função:
                            value={usuario.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    {/* CONFIRMAR SENHA */}
                    {/* Confirmar Senha não existe no BD, apenas aqui para verificar se o usuario digitou corretamente */}
                    <div className="flex flex-row items-center w-full">
                        <label htmlFor="confirmarSenha" className="w-36 text-align-center text-gray-800">Confirmar Senha: </label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            placeholder="Confirmar Senha"
                            className="flex-1 border-2 border-gray-400 rounded p-2 text-gray-400"
                            //atualizar, chamar a função:
                            value={confirmarSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                        />
                    </div>

                    <div className="flex justify-around w-full gap-8">
                        <button
                            type="reset"
                            className="bg-dark-500 text-gray-900 hover:bg-red-900 hover:text-white font-semibold py-2 px-30 rounded-xl shadow-md cursor-pointer transition duration-300"
                            onClick={retornar}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="bg-dark-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold py-2 px-30 rounded-xl shadow-md cursor-pointer transition duration-300"
                        >

                            {/* Animação de carregamento de página */}
                            {
                                isLoading ?
                                    <ClipLoader
                                        color="#ffffff"
                                        size={24}
                                    />
                                    :
                                    <span>Cadastrar</span>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;
