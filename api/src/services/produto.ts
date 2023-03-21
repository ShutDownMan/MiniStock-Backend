import prisma from '../prisma';
import { randAlpha, randFood, randNumber, randRecentDate, randUrl } from '@ngneat/falso'

export default class ProdutoService {
    public static async imagineProduto(produto: any) {

        // imagine attributes
        const newProduto = {
            codigoBarras: randAlpha({ length: 45 }).join(''),
            nomeProduto: randFood(),
            precoCusto: randNumber({ min: 0, max: 1000 }),
            precoVenda: randNumber({ min: 0, max: 1000 }),
            qtdAtualEstoque: randNumber({ min: 0, max: 1000 }),
            dataCadastro: randRecentDate({ days: 10 }),
            imagem: randUrl()
        };

        // overwrite attributes with the ones from the request
        Object.assign(newProduto, produto);

        console.log(newProduto);

        let createdProduto = await prisma.produto.create({
            data: newProduto,
        });

        await prisma.produto_has_TipoProduto.create({
            data: {
                Produto_codProduto: createdProduto.codProduto,
                TipoProduto_idTipoProduto: 1 //randNumber({ min: 1, max: 4 }),
            }
        });

        return createdProduto;
    }

    public static async getProdutoByCod(codProduto: number) {
        const produto = await prisma.produto.findUnique({
            where: {
                codProduto: codProduto,
            },
            include: {
                Produto_has_TipoProduto: {
                    include: {
                        TipoProduto: true,
                    }
                }
            }
        });
        return produto;
    }

    public static async getAllProdutos() {
        const produtos = await prisma.produto.findMany({
            include: {
                Produto_has_TipoProduto: {
                    include: {
                        TipoProduto: true,
                    }
                }
            }
        });
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

    public static async getProdutoByNome(nomeProduto: string, limit: number = 10, offset: number = 0) {
        // fuzzy search
        const produtos = await prisma.produto.findMany({
            where: {
                nomeProduto: {
                    search: nomeProduto,
                },
            },
            include: {
                Produto_has_TipoProduto: {
                    include: {
                        TipoProduto: true,
                    }
                }
            },
            take: limit,
            skip: offset,
        });
        return produtos;
    }

    public static async getAllTipos() {
        const tipos = await prisma.tipoProduto.findMany();
        return tipos;
    }
}