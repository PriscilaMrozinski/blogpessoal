import type Tema from "./Tema";
import type Usuario from "./Usuario";

export default interface Postagem {
    id: number;
    titulo: string;
    texto: string;
    data: string; // string: porque o BD quem gera, aqui só exibe, não precisa manipular
    tema: Tema | null; // aqui deve preencher o campo
    usuario: Usuario | null;  // aqui deve preencher o campo
}