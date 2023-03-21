import express from 'express';
import { UsuarioController } from '../controllers/usuario';

let router = express.Router()

router.get('/api/usuario', UsuarioController.getAllUsuarios);
router.get('/api/usuario/:id', UsuarioController.getUsuarioById);

module.exports = router
