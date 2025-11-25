import { useContext, useEffect, useState } from "react"
import { buscar, deletar } from "../../../services/Services"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarTema() {
  const navigate = useNavigate()
  const [tema, setTema] = useState<Tema>({} as Tema)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token
  const { id } = useParams<{ id: string }>()

  //Buscar tema por id:
  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
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

  // Verifica o valor do token, se estiver vazio: usurio nao autenticado
  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'erro')
      navigate('/')
    }
  }, [token])

  //Buscar id
  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  // Função deletar:
  async function deletarTema() {
    setIsLoading(true)

    try {
      await deletar(`/temas/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      ToastAlerta('Tema apagado com sucesso', 'sucesso')
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        ToastAlerta('Erro ao deletar o tema.', 'erro')
      }
    }

    setIsLoading(false)
    retornar()
  }

  // Fim da função deletar.


  //  Função para redirecionar o usuário para temas
  function retornar() {
    navigate("/temas")
  }




  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4 text-gray-800'>Deletar tema</h1>
      <p className='text-center font-semibold mb-4 text-gray-800'>
        Você tem certeza de que deseja apagar o tema a seguir?
      </p>
      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header
          className='py-2 px-6 bg-yellow-50 text-gray-800 font-bold text-2xl'>
          Tema
        </header>

        {/* Substituir <p >tema</p> por: */}
        <p className='p-8 text-3xl bg-yellow-50 text-gray-600 h-full'>{tema.descricao}</p>
        

        <div className="flex">
          {/* Botão NAO deletar */}
          <button
            className='text-slate-100 bg-gray-200 hover:bg-gray-600  w-full py-2'
            onClick={retornar}>
              {/* adicionar acima o onclick - será executado sempre que o NAO for clicado */}
            Não
          </button>


          {/* Botão SIM deletar */}
          {/* Adicionar: onclick para chamar a função deletar tema*/}
          {/* ClipLoader true: exibe o loader da biblioteca Reac Spinners */}

          <button
            className='w-full text-slate-100 bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-gray-500 hover:to-gray-600 flex items-center justify-center'
              onClick={deletarTema}>
                
                {isLoading ?
                <ClipLoader
                color='#ffffff'
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

export default DeletarTema
