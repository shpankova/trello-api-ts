import express, { Application } from "express";
import helmet from "helmet";

import routerBoard from "./routes/boardRoutes";
import routerCard from "./routes/cardRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routerBoard);
app.use("/api", routerCard);

app.use(helmet());
app.use(errorMiddleware);

export default app;
