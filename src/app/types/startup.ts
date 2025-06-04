export interface Projeto {
    id: number
    nome: string
    descricao: string
    status: string
    upvotes: number
}

export interface Startup {
    id: number,
    nomeFantasia: string,
    cnpj: string,
    dataCadastro: string,
    dataCriacao: string,
    localizacao: {
        cidade: string,
        estado: string
    },
    profileImage: string,
    projetos?: Projeto[]
}