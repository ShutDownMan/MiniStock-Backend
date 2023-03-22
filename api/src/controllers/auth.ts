import { Request, Response } from 'express';
import AuthService from '../services/auth';

export class AuthController {
    public static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await AuthService.login(email, password);
            res.send(token);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }

    public static async logout(req: Request, res: Response) {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const result = await AuthService.logout(token);
            res.send(result);
        } catch (err: any) {
            res.status(500).send(err.message || "Internal Server Error");
        }
    }
}