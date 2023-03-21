import { Request, Response } from 'express';
import NotaCompraService from '../services/nota-compra';

export default class NotaCompraController {
    public static async imagineCompra(req: Request, res: Response) {
        // create new compra using the service
        try {
            const compra = req.body;
            const newCompra = await NotaCompraService.imagineNotaCompra(compra);
            res.send(newCompra);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }
    public static async getCompraById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const compra = await NotaCompraService.getNotaCompraByCod(id);
            res.send(compra);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }
    public static async getAllCompras(req: Request, res: Response) {
        try {
            const compras = await NotaCompraService.getAllNotaCompras();
            res.send(compras);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }
    public static async createCompra(req: Request, res: Response) {
        try {
            const compra = req.body;
            const newCompra = await NotaCompraService.createNotaCompra(compra);
            res.send(newCompra);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }
    public static async updateCompra(req: Request, res: Response) {
        try {
            const compra = req.body;
            const updatedCompra = await NotaCompraService.updateCompra(compra);
            res.send(updatedCompra);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }
    public static async deleteCompra(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await NotaCompraService.deleteNotaCompra(id);
            res.status(204).send();
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }
}