import { useNavigate } from "react-router-dom"
import CardTema from "../cardtema/CardTema"
import { buscar } from "../../../services/Services";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { SyncLoader } from "react-spinners";


function ListaTemas() {

    // IMPLEMENTAR A LÓGICA DO COMPONENTE ListaTemas

    // 1º Passo: configurar os estados
    const navigate = useNavigate();

    // carregar ícone de carregamento
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // criar o State tema com array 
    // inicializa com um array vazio: >([])
    const [temas, setTemas] = useState<Tema[]>([])

    // pegar o token que está guardado no Context:
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token    // constante que recebe o token do usuario

    // Fim do 1º Passo.

   // 5º Passo - useEffect do React: serve para executar efeitos colaterais (executar buscar temas) quando algo muda no componente.
    useEffect(() => {
        buscarTemas()
    }, [temas.length])

    // 6º Passo - useEffect do navigate: monitora se está logado -- if (token === '') : se token estiver vazio -- navigate('/'): envia para a tela de login
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

 


    // 2º Passo: Função para buscar temas (tem que ser assincrona)
    async function buscarTemas() {
        try {
            setIsLoading(true) // carregar a animação
            // fazer a requisição com Token:
            await buscar('/temas', setTemas, {
                headers: { Authorization: token } // Atenção! Se o sistema não tiver autenticação não precisa dessa linha.
            })
            // fazer a verificação se está logado:
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false) // independente do resultado positivo ou negativo: esconde a animação
        }
    }

    // Fim do 2º Passo.





    return (
        <>
            {/* 3º Passo: Adicionar a animação */}
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader
                        color="#312e81"
                        size={32}
                    />
                </div>
            )}
            {/* Fim 3º PAsso. */}

            {/* Estilização */}
            <div className="flex justify-center max-w-full my-4">
                <div className="container flex flex-col">

                    {/* 4º Passo:  Exibir mensagem, caso não encontre nenhum tema cadastrado no backend, gera um span. */}
                    {(!isLoading && temas.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhum Tema foi encontrado!
                        </span>
                    )}

                    {/* Fim. 4º Passo. */}



                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* 5º Passo: adiciona o card Tema: (substitui: <CardTema /> ) */}
                        {/* Percorre o Array temas, pode modificar, antes de renderizar um componente CardTema para cada tema ser armazenado */}
                        {/* map: é uma função nativa do TypeScript */}

                        {
                            temas.map((tema) => (
                                <CardTema key={tema.id} tema={tema} />
                            ))
                        }

                        {/*  cada card tem a sua respectiva chave (o ID)------ tema={tema} : passa a Props */}
                        {/* Fim 5º Passo. */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaTemas