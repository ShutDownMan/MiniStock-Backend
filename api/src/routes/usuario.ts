/**
 * @swagger
 * components:
 *   /api/usuario:
 *     get:
 *       summary: Returns the list of all the usuarios
 *       tags: [Usuarios]
 *       responses:
 *         200:
 *           description: The list of the usuarios
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Usuario'
 *          500:
 *           description: Internal server error
 *   /api/usuario/{id}:
 *     get:
 *       summary: Get the usuario by id
 *       tags: [Usuarios]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: The usuario id
 *       responses:
 *         200:
 *           description: The usuario description by id
 *           contens:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Usuario'
 *         404:
 *           description: The usuario was not found
 *         500:
 *           description: Some server error
 */
import { UsuarioController } from '../controllers/usuario';

export default (app: any) => {
    app.get('/api/usuario', UsuarioController.getAllUsuarios);
    app.get('/api/usuario/:id', UsuarioController.getUsuarioById);
}
