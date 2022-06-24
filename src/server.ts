import app from "./app";
import config from "config";

const PORT = config.get("port") as number;
const HOST = config.get("host") as string;

app.listen(PORT, HOST, () => {
    console.log(`Server listens http://${HOST}:${PORT}`);
});