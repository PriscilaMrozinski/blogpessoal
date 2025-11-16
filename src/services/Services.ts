import axios from "axios"

// Informar endereço da API:
const api = axios.create({
    baseURL:'https://blogpessoal-j31y.onrender.com' // guarda o endereço da API, para onde as requisições serão enviadas
})

// Função de Cadastrar Usuario:
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data); // atualiza o objeto, preenche os dados gerados automaticamente pelo BD, ex.: ID
}

// Função de Login:
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data); // atualiza o objeto, preenche os dados gerados automaticamente pelo BD, ex.: ID
}

