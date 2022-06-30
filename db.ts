import { Pool } from "pg";

let config = null;
const env = process.env.NODE_ENV;
if (env === "development" || env === "production") {
  config = {
    user: "postgres",
    host: "postgres",
    database: "trello-api-docker",
    password: "61665786",
    port: 5432
  };
}

if (env === "test") {
  config = {
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "61665786",
    port: 5432
  };
}

export const pool = new Pool(config);

pool.on("connect", () => {
  console.log("DB connected succesfuly!");
});
