import { Request, Response } from 'express';
import ProdutoService from '../services/produto';
import { ProdutoUpdateModel } from '../models/produto';
import { validate } from 'class-validator';

export default class ProdutoController {

    /**
     * Create a new produto with bogus data
     * @param req 
     * @param res 
     */
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

    /**
     * Get a produto by id
     * @param req 
     * @param res 
     */
    public static async getProdutoById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const produto = await ProdutoService.getProdutoByCod(id);
            res.send(produto);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    /**
     * Get all produtos
     * @param req 
     * @param res 
     */
    public static async getAllProdutos(req: Request, res: Response) {
        try {
            const produtos = await ProdutoService.getAllProdutos();
            res.send(produtos);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    /**
     * Create a new produto
     * @param req 
     * @param res 
     */
    public static async createProduto(req: Request, res: Response) {
        try {
            const produto = req.body;
            const newProduto = await ProdutoService.createProduto(produto);
            res.send(newProduto);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    /**
     * Update a produto
     * @param req 
     * @param res 
     * @returns 
     */
    public static async updateProduto(req: Request, res: Response) {
        try {
            const produto: ProdutoUpdateModel = {
                codProduto: parseInt(req.params.id),
                ...req.body,
            }

            const errors = await validate(produto);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }

            const updatedProduto = await ProdutoService.updateProduto(produto);
            res.send(updatedProduto);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    /**
     * Delete a produto
     * @param req 
     * @param res 
     */
    public static async deleteProduto(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await ProdutoService.deleteProduto(id);
            res.status(204).send();
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    /**
     * Get a produto by nome
     * @param req 
     * @param res 
     */
    public static async getProdutoByNome(req: Request, res: Response) {
        try {
            const { nome, limit, offset } = req.params;
            const produtos = await ProdutoService.getProdutoByNome(nome, parseInt(limit), parseInt(offset));
            res.send(produtos);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    /**
     * Get all tipos
     * @param req 
     * @param res 
     */
    public static async getAllTipos(req: Request, res: Response) {
        try {
            const tipos = await ProdutoService.getAllTipos();
            res.send(tipos);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    /**
     * Push a tipo to a produto's list of tipos
     * @param req 
     * @param res 
     */
    public static async pushTipoProduto(req: Request, res: Response) {
        try {
            const { produtoid, tipoid } = req.params;
            const produto = await ProdutoService.pushTipoProduto(parseInt(produtoid), parseInt(tipoid));
            res.send(produto);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    /**
     * Delete a tipo from a produto's list of tipos
     * @param req 
     * @param res 
     */
    public static async deleteTipoProduto(req: Request, res: Response) {
        try {
            const { produtoid, tipoid } = req.params;
            await ProdutoService.deleteTipoProduto(parseInt(produtoid), parseInt(tipoid));
            res.status(204).send();
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }
}