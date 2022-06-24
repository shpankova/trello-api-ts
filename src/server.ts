import express, { Application} from 'express';
import config from "config";
// const helmet = require('helmet')

import routerBoard from './routes/board'
// import errorMiddleware from './middlewares/error-middleware'

const PORT = config.get("port") as number;
const HOST = config.get("host") as string;


const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', routerBoard)

// app.use(helmet())
// app.use(errorMiddleware)


app.listen(PORT, HOST, () => {
    console.log(`Server listens http://${HOST}:${PORT}`);
});

