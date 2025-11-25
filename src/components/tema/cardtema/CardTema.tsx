import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

interface CardTemaProps {
    tema: Tema
}
// tema: nome do objeto, da propriedade
// Tema: tipo da propriedade


function CardTema({ tema }: CardTemaProps) {
    return (
        <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
            <header className="py-2 px-6 bg-yellow-50 text-gray-800 font-bold text-2xl">
                Tema
            </header>
            <p className='p-8 text-3xl bg-yellow-50 h-full text-gray-600'>{tema.descricao}</p>

            <div className="flex">
                <Link to={`/editartema/${tema.id}`}
                    className="w-full text-slate-100 bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-gray-500 hover:to-gray-600
                flex items-center justify-center py-2">
                    <button>Editar</button>
                </Link>

                {/* Sempre que usuario deletar será redirecionado para o DeletarTema */}
                <Link to={`/deletartema/${tema.id}`}
                    className="text-slate-100 bg-gray-200 hover:bg-gray-600 w-full
                flex items-center justify-center">
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardTema