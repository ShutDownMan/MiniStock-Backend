import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createProdutos() {
    return await prisma.produto.create({
        data: {
            codProduto: 1,
            nomeProduto: 'Produto 1',
            qtdAtualEstoque: 10,
            precoCusto: 150,
            precoVenda: 200,
            dataCadastro: new Date(),
        },
    })
}

async function main() {
    await createProdutos()
}

main()