interface Projeto {
    id: number,
    nome: string,
    dataPrevistaInicio: string,
    dataPrevistaEntrega: string,
    status: string,
    descricao: string,
    startup: Startup,
    upvotes: number,
    isLiked: boolean,
    dataCadastro: string,
    isPelando: boolean
}