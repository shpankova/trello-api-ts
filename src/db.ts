import {Pool} from 'pg'

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "trello-api-docker",
    password: "61665786",
    port: 5432,
});

pool.on('connect', () => {
    console.log('DB connected succesfuly!');
});


