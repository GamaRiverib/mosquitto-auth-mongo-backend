import { Db, MongoClient } from "mongodb";
import { MosquittoAuthRepository } from "mosquitto-auth-manager";
import { MosquittoAuthMongoRepository } from "./mongo_repository";

export { UserMongoEntity, RuleMongoEntity } from "./mongo_repository";

const MONGODB_CONN_URL: string = process.env.MOSQUITTO_AUTH_MONGODB_CONN_URL || "mongodb://localhost:27017";
const DB_NAME: string = process.env.MOSQUITTO_AUTH_DB_NAME || "mosquitto-auth-db";

let DB: Db | null = null;
let CLIENT: MongoClient | null = null;

async function connectDatabase(): Promise<void> {
  if (CLIENT === null) {
    CLIENT = await MongoClient.connect(MONGODB_CONN_URL, { useUnifiedTopology: true });
  }
}

async function getDatabase(): Promise<Db> {
  await connectDatabase();
  if(DB === null) {
    DB = CLIENT.db(DB_NAME);
  }
  return DB;
}

export async function getMosquittoAuthMongoRepository(): Promise<MosquittoAuthRepository> {
  console.log("getMosquittoAuthMongoRepository()");
  await connectDatabase();
  const db: Db = await getDatabase();
  return new MosquittoAuthMongoRepository(db);
}

console.log("mosquitto-auth-mongo-backend");
