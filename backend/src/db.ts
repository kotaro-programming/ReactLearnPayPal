import { Pool } from "pg";

//本来は環境変数で管理する
export const pool = new Pool({
    user: "",
    host: "",
    database: "",
    password: "",
    port: 5432,
});

