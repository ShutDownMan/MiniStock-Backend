import express from 'express';
import { AuthController } from '../controllers/auth';

let router = express.Router()

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

module.exports = router
