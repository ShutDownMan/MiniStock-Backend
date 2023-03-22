import express from 'express';
import NotaCompraController from '../controllers/nota-compra'

let router = express.Router()

router.get('/item-compra/list', NotaCompraController.getAllItemComprasFromNotaCompra)
router.put('/push-item-compra', NotaCompraController.pushItemCompra)
router.put('/pull-item-compra', NotaCompraController.deleteItemCompra)

router.get('/list', NotaCompraController.getAllNotaCompras)
router.get('/:id', NotaCompraController.getNotaCompraById)
router.post('/', NotaCompraController.createNotaCompra)
router.put('/:id', NotaCompraController.updateNotaCompra)
router.delete('/:id', NotaCompraController.deleteNotaCompra)
router.post('/imagine', NotaCompraController.imagineNotaCompra)

module.exports = router