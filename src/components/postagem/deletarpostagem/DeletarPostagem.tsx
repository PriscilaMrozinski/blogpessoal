import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"

import { ClipLoader } from "react-spinners"
import { buscar, deletar } from "../../../services/Services"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarPostagem() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'erro')
            
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

           ToastAlerta('Postagem apagada com sucesso', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                ToastAlerta('Erro ao deletar a postagem.', 'erro');
               
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }
    
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4 text-gray-800'>Deletar Postagem</h1>

            <p className='text-center font-semibold mb-4 text-gray-800'>
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-yellow-50 text-gray-800 font-bold text-2xl'>
                    Postagem
                </header>
                <div className="p-4 text-gray-600 bg-yellow-50">
                    <p className='text-xl h-full text-gray-600 bg-yellow-50'>{postagem.titulo}</p>
                    <p className='text-xl h-full text-gray-600 bg-yellow-50'>{postagem.texto}</p>
                </div>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-gray-200 hover:bg-gray-600  w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-gray-500 hover:to-gray-600 flex items-center justify-center'
                        onClick={deletarPostagem}>

                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Sim</span>
                        }
                        
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem