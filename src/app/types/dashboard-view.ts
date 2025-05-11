import UpvoteGroupedByDate from "./upvote-groupedby-date";

export default interface DashboardView {
    id: number,
    nome: string,
    descricao: string,
    dataInicio: Date,
    dataEntrega: Date,
    totalEntregaveis: number,
    entreguesNoPrazo: number,
    entreguesComAtraso: number,
    emAtraso: number,
    indiceDesempenhoPrazo: number,
    taxaConclusaoEntregaveis: number,
    entregaveisEmAndamento: number,
    totalUpvotes: number,
    taxaCrescimentoUpvotes: number,
    upvotes: UpvoteGroupedByDate[],
    entregaveis: Entregavel[]
}