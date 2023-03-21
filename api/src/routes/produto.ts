import ProdutoController from '../controllers/produto'

export default (app: any) => {
    app.get('/api/produto', ProdutoController.getAllProdutos);
    app.get('/api/produto/:id', ProdutoController.getProdutoById);
    app.post('/api/produto', ProdutoController.createProduto);
    app.put('/api/produto/:id', ProdutoController.updateProduto);
    app.delete('/api/produto/:id', ProdutoController.deleteProduto);
}