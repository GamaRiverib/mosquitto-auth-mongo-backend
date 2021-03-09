import { Db, MongoClient } from "mongodb";

const DB_NAME: string = process.env.MOSQUITTO_AUTH_DB_NAME || "mosquitto_auth_db_test";
const MONGODB_CONN_URL: string = process.env.MOSQUITTO_AUTH_MONGODB_CONN_URL || "mongodb://localhost:27017";

let DB: Db | null = null;
let CLIENT: MongoClient | null = null;

async function connectDatabase(): Promise<void> {
  if (CLIENT === null) {
    CLIENT = await MongoClient.connect(MONGODB_CONN_URL, { useUnifiedTopology: true });
  }
}

export async function getDatabase(): Promise<Db> {
  await connectDatabase()
  if(DB === null) {
    DB = CLIENT.db(DB_NAME);
  }
  return DB;
}
