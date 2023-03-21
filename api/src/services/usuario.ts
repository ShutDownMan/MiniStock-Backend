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
}

