import express from 'express';
import NotaCompraController from '../controllers/nota-compra'

let router = express.Router()

router.get('/list', NotaCompraController.getAllCompras)
router.get('/:id', NotaCompraController.getCompraById)
router.post('/', NotaCompraController.createCompra)
router.put('/:id', NotaCompraController.updateCompra)
router.delete('/:id', NotaCompraController.deleteCompra)
router.post('/imagine', NotaCompraController.imagineCompra)

module.exports = router