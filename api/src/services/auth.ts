import prisma from '../prisma';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default class AuthService {
    public static hashPassword(password: string, saltRounds: number) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        return hash;
    }

    public static async login(email: string, password: string) {
        const usuario = await prisma.usuario.findUnique({
            where: {
                emailUsuario: email,
            },
        });

        if (!usuario) {
            throw new Error('Usuario não encontrado');
        }

        try {
            if (await bcrypt.compare(password, usuario.hashSenha) === false) {
                throw new Error('Senha incorreta');
            }
        } catch (error) {
            console.log(error);
            throw new Error('Senha incorreta');
        }

        // check if token is not expired
        const token = await prisma.token.findFirst({
            where: {
                Usuario_idUsuario: usuario.idUsuario,
                expirado: 0,
                expiration: {
                    gt: new Date(),
                },
            },
        });

        if (token) {
            return token;
        }

        // create token
        const expirationDate = (new Date()).getTime() + 1000 * 60 * 60 * 24 * 7
        const newToken = await prisma.token.create({
            data: {
                token: uuidv4(),
                expirado: 0,
                expiration: new Date(expirationDate),
                Usuario: {
                    connect: {
                        idUsuario: usuario.idUsuario,
                    },
                },
            },
        });

        return newToken;
    }

    public static async logout(token: string) {
        // revoke token
        const tokenRevoked = await prisma.token.update({
            where: {
                token: token,
            },
            data: {
                expirado: 1,
            },
        });

        return tokenRevoked;
    }
}