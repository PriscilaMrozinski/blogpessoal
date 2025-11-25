import { useContext, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { GlobeHemisphereWestIcon } from '@phosphor-icons/react';
import { ToastAlerta } from '../../utils/ToastAlerta';

function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout(); // limpa o usuario
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info');
        navigate('/'); // direciona para a pg de login
    }

    // Renderização Condicional:

    let component: ReactNode

    if(usuario.token !== "") {
        component = (
            <div className='w-full flex justify-center px-6 py-12 bg-black/20 shadow-[0_8px_25px_rgba(0,0,0,0.55)]
        border-b border-white/10  rounded-b-2xl rounded-t-2xl text-gray-300'
        >
            {/* <div><ArticleMediumIcon size={36} className="text-white" /></div> */}
            <div><GlobeHemisphereWestIcon size={32} className="text-yellow-600" /> </div>

            <div className='container flex justify-between text-lg mx-8'>

                {/* Criar link para a rota */}
                <Link to="/home" className="text-6xl sm:text-3xl font-bold title-font text-yellow-600 text-shadow2">
                    Blog Pessoal </Link>

                <div className='flex gap-4 text-lg font-bold space-x-6 text-red-800 text-shadow2'>
                    <div><Link to='/postagens' className='hover:underline'>Postagens</Link></div>
                    <div><Link to='/temas' className='hover:underline'>Temas</Link></div>
                    <div><Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link></div>
                    <Link to='/perfil' className="hover:underline">Perfil</Link>
                    <div><Link to='' onClick={logout} className='hover:underline'>Sair</Link></div>
                </div>
            </div>
        </div>
        )

    }

    return (
        <>
        { component }
        </>
    )
}

export default Navbar
