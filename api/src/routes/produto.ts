import express from 'express';
import ProdutoController from '../controllers/produto'

let router = express.Router()

router.get('/list', ProdutoController.getAllProdutos)
router.get('/:id', ProdutoController.getProdutoById)
router.post('/', ProdutoController.createProduto)
router.put('/:id', ProdutoController.updateProduto)
router.delete('/:id', ProdutoController.deleteProduto)
router.post('/imagine', ProdutoController.imagineProduto)

router.get('/find/:nome', ProdutoController.getProdutoByNome)

router.get('/tipo/list', ProdutoController.getAllTipos)

module.exports = router