import { Startup } from "./startup"

export interface Projeto {
    id: number,
    nome: string,
    descricao: string,
    status: string,
    upvotes: number,
    startup: Startup,
    dataPrevistaInicio: string,
    dataPrevistaEntrega: string,
    dataCadastro: string,
    isLiked: boolean,
    isPelando: boolean
}