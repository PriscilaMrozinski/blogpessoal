import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import { useContext, type ReactNode } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {
    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext);

    let component: ReactNode

    if(usuario.token !== "") {

        component = (


        <div className='
            w-full flex justify-center 
            bg-black/40  
            shadow-[0_8px_25px_rgba(0,0,0,0.55)]
            border-b 
            border-white/10 
            rounded-b-2xl
            rounded-t-2xl
            text-gray-300'
            >


                <div className='container flex flex-col items-center py-3'>
                    <p className='text-base font-bold'>
                        Blog Pessoal - Priscila Lins Mrozinski | Copyright {data}
                    </p>
                    <p className='text-sm py-1'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2'>

                        <a className='px-1 py-1' href='https://www.linkedin.com/in/priscila-lins/' target='_blank'>
                            <LinkedinLogoIcon size={38} color="#F2D0D2" weight="light" />
                        </a>
                        <a className='px-1 py-1' href='https://www.instagram.com/priscila_alins' target='_blank'>
                            <InstagramLogoIcon size={38} color="#F2D0D2" weight="light" />
                        </a>
                        <a className='px-1 py-1' href='https://github.com/PriscilaMrozinski' target='_blank'>
                            <GithubLogoIcon size={38} color="#F2D0D2" weight="light" />
                        </a>

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

export default Footer