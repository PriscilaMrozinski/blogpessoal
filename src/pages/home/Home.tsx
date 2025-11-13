function Home() {
    return (
        // Container
        <div className="flex justify-center">

            {/* Grid que divide a tela em 2 colunas */}
            <div
                className="container grid grid-cols-2 sm:grid-cols-2 text-white"
            // configuração responsividade: sm:grid-cols-1
            >
                {/* Coluna da esquerda */}
                <div className="flex flex-col gap-4 items-center justify-center py-6">
                    <h2 className="text-6xl font-bold title-font text-shadow py-10
                    ">
                        Seja Bem-Vindo!</h2>
                    <p className="text-xl">
                        Expresse aqui seus pensamentos e opniões.</p>

                    {/* Link / Botão */}
                    <div className="flex justify-around gap-4">
                        <div className="rounded text-white border-white border-solid border-2 py-2 px-4"
                        >Nova Postagem</div>
                    </div>
                </div>

                {/* Coluna da direita */}

                <div className="flex justify-center">
                    <img
                        src="https://ik.imagekit.io/okf70gijs/blog.png?updatedAt=1763063996618"
                        alt="Imagem da Página Home"
                        className="w-2/3 py-20"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home