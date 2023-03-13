import { Client } from "pg";
import config from "../configs/ebdb.config";

export const query = async (sql : string) => {
    const client = new Client(config);
    await client.connect();
    const queryResults = await client.query(sql);
    await client.end()
    return queryResults;
};
