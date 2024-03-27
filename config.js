import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, ".env") });

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const DB_HOST = process.env.DB_HOST;
export const USER = process.env.USER;
export const PSSWRD = process.env.PSSWRD;
export const PORT_MARIA = process.env.PORT_MARIA;
export const DATABASE = process.env.DATABASE;


