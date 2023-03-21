import prisma from '../prisma';

export default class ProdutoService {
    public static async getProdutoByCod(codProduto: number) {
        const produto = await prisma.produto.findUnique({
            where: {
                codProduto: codProduto,
            },
        });
        return produto;
    }

    public static async getAllProdutos() {
        const produtos = await prisma.produto.findMany();
        return produtos;
    }

    public static async createProduto(produto: any) {
        const newProduto = await prisma.produto.create({
            data: produto,
        });
        return newProduto;
    }

    public static async updateProduto(produto: any) {
        if (produto.codProduto === undefined) {
            throw new Error('codProduto is required');
        }

        const updatedProduto = await prisma.produto.update({
            where: {
                codProduto: produto.codProduto,
            },
            data: produto,
        });
        return updatedProduto;
    }

    public static async deleteProduto(id: number) {
        if (id === undefined) {
            throw new Error('codProduto is required');
        }

        await prisma.produto.delete({
            where: {
                codProduto: id,
            },
        });
    }
}