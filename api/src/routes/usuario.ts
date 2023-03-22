import express from 'express';
import { UsuarioController } from '../controllers/usuario';

let router = express.Router()

router.get('/', UsuarioController.getAllUsuarios);
router.get('/:id', UsuarioController.getUsuarioById);

router.post('/me', UsuarioController.getUsuarioLogado);

module.exports = router
