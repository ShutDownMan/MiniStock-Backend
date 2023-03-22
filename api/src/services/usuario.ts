import prisma from '../prisma';

export class UsuarioService {
    public static async getAllUsuarios() {
        const usuarios = await prisma.usuario.findMany();
        return usuarios;
    }

    public static async getUsuarioById(id: number) {
        const usuario = await prisma.usuario.findUnique({
            where: {
                idUsuario: id,
            },
        });
        return usuario;
    }

    public static async getUsuarioLogado(token: string) {
        const usuarioToken = await prisma.token.findUnique({
            where: {
                token: token,
            },
            include: {
                Usuario: {
                    select: {
                        idUsuario: true,
                        nomeUsuario: true,
                        emailUsuario: true,
                        TipoUsuario: true,
                    },
                },
            }
        });

        if (!usuarioToken) {
            throw new Error('Token inválido');
        }

        return usuarioToken.Usuario;
    }

}

