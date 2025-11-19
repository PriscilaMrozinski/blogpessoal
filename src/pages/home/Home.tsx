import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"

function Home() {
    return (
        <>
       
            <div className="flex justify-center  text-gray-black">

                {/* Grid que divide a tela em 2 colunas */}
                <div
                    className="container grid grid-cols-1 sm:grid-cols-2"
                // configuração responsividade: sm:grid-cols-1
                >
                    {/* Coluna da esquerda */}
                    <div className="flex flex-col gap-4 items-center justify-center py-6 mt-10">
                        <h2 className="text-6xl font-bold title-font text-red-800 text-shadow2">
                            Seja Bem-Vindo!</h2>
                        <p className="text-xl text-gray-400 text-shadow py-5">
                            Expresse aqui seus pensamentos e opniões.</p>

                        {/* Link / Botão */}
                        {/* <div className="flex justify-around gap-4">
                            <div className="bg-dark-900 hover:bg-gray-800 text-gray-400 font-semibold py-2 px-6 rounded-xl shadow-md cursor-pointer transition duration-300"
                            >Nova Postagem</div>
                        </div> */}

                        {/* Substituir o bloco acima pelo Modal */}
                        <ModalPostagem />



                    </div>

                    {/* Coluna da direita */}

                    <div className="flex justify-center mt-10">
                        <img
                            src="https://ik.imagekit.io/okf70gijs/p.png"
                            alt="Imagem da Página Home"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
            <ListaPostagens />
        </>
    )
}

export default Home