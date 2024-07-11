export interface Produto {
    id: number 
    descricao: string 
    link: string 
    valor: number 
    imagemPath: string 
    categoriaId: number 
    plataformaId: number
}

export interface ProdutoFavoritado extends Produto {
    prioridade: number 
    aviso: boolean
}

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