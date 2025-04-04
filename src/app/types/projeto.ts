interface Projeto {
    id: number,
    nome: string,
    dataPrevistaInicio: string,
    dataInicio: string,
    dataPrevistaEntrega: string,
    dataEntrega: string,
    status: string,
    descricao: string,
    startup: Startup,
    entregaveis: Entregavel[],
    upvote: any[]
    liked: boolean;
}