import { DB_HOST, USER, PSSWRD, PORT_MARIA } from "../config.js";
import mariadb from "mariadb";
export const pool = mariadb.createPool({
    host: `${DB_HOST}`,
    user: `${USER}`,
    password: `${PSSWRD}`,
    database: 'sofia',
    port: `${PORT_MARIA}`
})

