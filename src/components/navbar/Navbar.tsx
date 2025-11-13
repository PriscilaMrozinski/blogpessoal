import React from 'react'
import { Link } from 'react-router-dom'

function navbar() {
    return (
        <div className='w-full flex justify-center py-4 bg-gray-50 text-gray-600'>
            <div className='container flex justify-between text-lg mx-8 '>
                
                {/* Criar link para a rota */}
                <Link to="/home" className="text-2xl font-bold text-amber-600 text-shadow2"> Blog Pessoal </Link>

                <div className='flex gap-4 text-lg font-bold text-shadow-gray' >
                    <div className='px-2'>Postagens</div>
                    <div className='px-2'>Temas</div>
                    <div className='px-2'>Cadastrar</div>
                    <div className='px-2'>Perfil</div>
                    <div className='px-2'>Sair</div>
                </div>
            </div>
        </div>
    )
}

export default navbar
