import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario';

export class UsuarioController {
    public static async getAllUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await UsuarioService.getAllUsuarios();
            res.send(usuarios);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async getUsuarioById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const usuario = await UsuarioService.getUsuarioById(id);
            res.send(usuario);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }
}