export interface ProdutoCard {
    produtoId: number
    link: string
    descricao: string
    valor: number
    imagemPath: string
    isFavoritado: boolean
}

export interface ProdutoScrap {
    descricao: string
    valor: string
    valorConvertido: number
    imagemPath: string
    plataforma: string
}