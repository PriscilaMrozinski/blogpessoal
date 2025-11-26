import axios from "axios"

// Informar endereço da API:
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    // guarda o endereço da API, para onde as requisições serão enviadas, o endereço do render .env
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

// Função para consultar com token
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

// Função para cadastrar com token
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
}

// Função para atualizar com token
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header);
    setDados(resposta.data);
}

// Função para deletar com token
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header);
}