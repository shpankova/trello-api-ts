const express = require('express')
const helmet = require('helmet')

import routerBoard from './routes/board'
import errorMiddleware from './middlewares/error-middleware'

const app = express();

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use('/api', routerBoard)

app.use(helmet())
app.use(errorMiddleware)

export default app;
