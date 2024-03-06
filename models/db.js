//const mariadb = require("mariadb")
import mariadb from "mariadb";
export const pool = mariadb.createPool({
    host: 'mariadb:3306',
    user: 'mariadb-manejo-usuario',
    password: 'manejo-usuario-password',
    database: 'manejo-usuario',
    port: '3306'
})
