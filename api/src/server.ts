import express, { Express, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app: Express = express()
const port = process.env.API_PORT

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

// usuario router
let usuarioRouter = require('./routes/usuario')
app.use('/api/usuario', usuarioRouter)

// auth router
let authRouter = require('./routes/auth')
app.use('/api/auth', authRouter)

// Produto router
let produtoRouter = require('./routes/produto')
app.use('/api/produto', produtoRouter)

// Compra router
let compraRouter = require('./routes/nota-compra')
app.use('/api/nota-compra', compraRouter)

// open swagger.json file
const options = require('./swagger')["default"]
const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

// bash one-liner to count sloc: find ./src -name '*.ts' | xargs wc -l