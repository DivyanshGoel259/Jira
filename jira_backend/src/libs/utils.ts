import pgPromise from "pg-promise";
import { DATABASE_URL, NODE_ENV } from "./env";

const pgp = pgPromise();

const dbConfig = {
  connectionString: DATABASE_URL,
  ssl: NODE_ENV === "Production" ? { rejectUnauthorized: false } : false,
};

const db = pgp(dbConfig);

export default db;
