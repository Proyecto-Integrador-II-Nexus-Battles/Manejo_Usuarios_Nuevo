import { DB_HOST, USER, PSSWRD, PORT_MARIA, DATABASE } from "../config.js";
import mariadb from "mariadb";
export const pool = mariadb.createPool({
    host: `${DB_HOST}`,
    user: `${USER}`,
    password: `${PSSWRD}`,
    database: DATABASE,
    port: `${PORT_MARIA}`
})

