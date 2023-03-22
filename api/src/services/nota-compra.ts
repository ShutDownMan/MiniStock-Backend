import prisma from '../prisma';
import { randAlpha, randFood, randNumber, randRecentDate } from '@ngneat/falso'
import { NotaCompraCreateModel, NotaCompraUpdateModel } from '../models/nota-compra';

export default class NotaCompraService {
    public static async imagineNotaCompra(compra: any) {

        const numOfProdutos = await prisma.produto.count();
        const numOfFornecedores = await prisma.fornecedor.count();

        // imagine attributes
        const numItems = randNumber({ min: 1, max: numOfProdutos });
        const produtos = (await prisma.produto.findMany({
            take: numItems,
        })).sort(() => Math.random() - 0.5);
        const itensCompra = await Promise.all(Array.from({ length: numItems }, async () => ({
            Produto_codProduto: produtos.pop()?.codProduto || 1,
            qtdItemCompra: randNumber({ min: 0, max: 1000 }),
            valorItemCompra: randNumber({ min: 0, max: 1000 }),
        })));

        const codFornecedor = randNumber({ min: 1, max: numOfFornecedores });
        const fornecedor = await prisma.fornecedor.findUnique({
            where: {
                codFornecedor: codFornecedor,
            },
        });

        const descontoCompra = randNumber({ min: 1, max: 100 }) / 100;
        const newNotaCompra = {
            dataCompra: randRecentDate({ days: 10 }),
            totalCompra: itensCompra.reduce((acc, item) => acc + item.qtdItemCompra * item.valorItemCompra, 0),
            descontoCompra: descontoCompra,
            valorLiquidoCompra: itensCompra.reduce((acc, item) => acc + item.qtdItemCompra * item.valorItemCompra, 0) * (1 - descontoCompra),
            Fornecedor_codFornecedor: fornecedor?.codFornecedor || 1,
            ItemCompra: {
                createMany: {
                    data: itensCompra,
                }
            }
        };

        // overwrite attributes with the ones from the request
        Object.assign(newNotaCompra, compra);

        console.log("newNotaCompra: ", newNotaCompra);
        console.log("newNotaCompra.ItemCompra: ", newNotaCompra.ItemCompra.createMany.data);

        try {
            const createdCompra = await prisma.notaCompra.create({
                data: newNotaCompra,
            });
            return createdCompra;
        }
        catch (error) {
            console.log("error: ", error)
            throw error;
        }
    }

    public static async getNotaCompraByCod(nroNotaCompra: number) {
        const compra = await prisma.notaCompra.findUnique({
            where: {
                nroNotaCompra: nroNotaCompra,
            },
            include: {
                ItemCompra: {
                    include: {
                        Produto: true,
                    },
                },
                Fornecedor: true,
            }
        });
        return compra;
    }

    public static async getAllNotaCompras() {
        const compras = await prisma.notaCompra.findMany({
            include: {
                ItemCompra: {
                    include: {
                        Produto: true,
                    },
                },
                Fornecedor: true,
            }
        });
        return compras;
    }

    public static async createNotaCompra(notaCompra: NotaCompraCreateModel) {
        let itemsToCreate = notaCompra.ItemCompra?.map(item => ({
            Produto_codProduto: item.Produto_codProduto,
            qtdItemCompra: item.qtdItemCompra,
            valorItemCompra: item.valorItemCompra,
        }));

        const notaCompraOmitted: Omit<NotaCompraCreateModel, 'ItemCompra'> = {
            ...notaCompra,
        }

        const newNotaCompra = await prisma.notaCompra.create({
            data: {
                ...notaCompraOmitted,
                ...(itemsToCreate && {
                    ItemCompra: {
                        createMany: {
                            data: itemsToCreate,
                        }
                    }
                })
            }
        });

        return newNotaCompra;
    }

    public static async updateCompra(notaCompra: NotaCompraUpdateModel) {
        if (notaCompra.nroNotaCompra === undefined) {
            throw new Error('codCompra is required');
        }

        const updatedCompra = await prisma.notaCompra.update({
            where: {
                nroNotaCompra: notaCompra.nroNotaCompra,
            },
            data: notaCompra,
        });
        return updatedCompra;
    }

    public static async deleteNotaCompra(id: number) {
        if (id === undefined) {
            throw new Error('codCompra is required');
        }

        await prisma.notaCompra.delete({
            where: {
                nroNotaCompra: id,
            },
        });
    }
}