import { Request, Response } from 'express';
import ProdutoService from '../services/produto';
import { Produto } from '../models/produto';

export default class ProdutoController {

    public static async imagineProduto(req: Request, res: Response) {
        // create new produto using the service
        try {
            const produto = req.body;
            const newProduto = await ProdutoService.imagineProduto(produto);
            res.send(newProduto);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async getProdutoById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const produto = await ProdutoService.getProdutoByCod(id);
            res.send(produto);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async getAllProdutos(req: Request, res: Response) {
        try {
            const produtos = await ProdutoService.getAllProdutos();
            res.send(produtos);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async createProduto(req: Request, res: Response) {
        try {
            const produto = req.body;
            const newProduto = await ProdutoService.createProduto(produto);
            res.send(newProduto);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async updateProduto(req: Request, res: Response) {
        try {
            const produto = req.body;
            const updatedProduto = await ProdutoService.updateProduto(produto);
            res.send(updatedProduto);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async deleteProduto(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await ProdutoService.deleteProduto(id);
            res.status(204).send();
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async getProdutoByNome(req: Request, res: Response) {
        try {
            const { nome, limit, offset } = req.params;
            const produtos = await ProdutoService.getProdutoByNome(nome, parseInt(limit), parseInt(offset));
            res.send(produtos);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async getAllTipos(req: Request, res: Response) {
        try {
            const tipos = await ProdutoService.getAllTipos();
            res.send(tipos);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }
}