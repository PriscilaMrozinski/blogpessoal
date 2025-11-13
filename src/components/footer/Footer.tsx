import { FacebookLogoIcon, GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'

function Footer() {
    let data = new Date().getFullYear()

    return (
        <>
            <div className='flex justify-center bg-gray-50 text-gray-600'>
                <div className='container flex flex-col items-center py-4'>
                    <p className='text-lg font-bold'>
                        Blog Pessoal - Priscila Lins | Copyright {data}
                    </p>
                    <p className='text-base'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2'>

                        <a className='px-1' href='https://www.linkedin.com/in/priscila-lins/' target='_blank'>
                            <LinkedinLogoIcon size={38} color="#ffb71f" weight="light" />
                        </a>
                        <a className='px-1' href='https://www.instagram.com/priscila_alins' target='_blank'>
                            <InstagramLogoIcon size={38} color="#ffb71f" weight="light" />
                        </a>
                        <a className='px-1' href='https://github.com/PriscilaMrozinski' target='_blank'>
                            <GithubLogoIcon size={38} color="#ffb71f" weight="light" />
                        </a>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer