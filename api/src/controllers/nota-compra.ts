import { Request, Response, NextFunction } from 'express';
import { NotaCompraCreateModel, NotaCompraUpdateModel } from '../models/nota-compra';
import NotaCompraService from '../services/nota-compra';

export default class NotaCompraController {
    public static async imagineNotaCompra(req: Request, res: Response) {
        try {
            const compra = req.body;
            const newCompra = await NotaCompraService.imagineNotaCompra(compra);
            res.send(newCompra);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async getNotaCompraById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const compra = await NotaCompraService.getNotaCompraByCod(id);
            res.send(compra);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async getAllNotaCompras(req: Request, res: Response) {
        try {
            const compras = await NotaCompraService.getAllNotaCompras();
            res.send(compras);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async createNotaCompra(req: Request, res: Response) {
        try {
            const compra: NotaCompraCreateModel = req.body;

            const newCompra = await NotaCompraService.createNotaCompra(compra);
            res.send(newCompra);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async updateNotaCompra(req: Request, res: Response, next: NextFunction) {
        try {
            const notaCompra: NotaCompraUpdateModel = {
                nroNotaCompra: parseInt(req.params.id),
                ...req.body,
            }

            const updatedCompra = await NotaCompraService.updateCompra(notaCompra);
            res.send(updatedCompra);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async deleteNotaCompra(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await NotaCompraService.deleteNotaCompra(id);
            res.status(204).send();
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async getAllItemComprasFromNotaCompra(req: Request, res: Response) {
        try {
            const nota_compra_id = parseInt(req.params.nota_compra_id);
            const compra = await NotaCompraService.getAllItemComprasFromNotaCompra(nota_compra_id);
            res.send(compra);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async pushItemCompra(req: Request, res: Response) {
        try {
            const { nroNotaCompra, codProduto, qtdItemCompra, valorItemCompra } = req.body;
            const compra = await NotaCompraService.pushItemCompra({
                nroNotaCompra,
                Produto_codProduto: codProduto,
                qtdItemCompra,
                valorItemCompra,
            });
            res.send(compra);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async deleteItemCompra(req: Request, res: Response) {
        try {
            const { nroNotaCompra, codProduto } = req.body;
            const compra = await NotaCompraService.deleteItemCompra({
                nroNotaCompra,
                Produto_codProduto: codProduto,
            });
            res.send(compra);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }
}