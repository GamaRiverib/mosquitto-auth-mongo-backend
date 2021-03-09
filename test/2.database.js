"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = void 0;
const mongodb_1 = require("mongodb");
const DB_NAME = process.env.MOSQUITTO_AUTH_DB_NAME || "mosquitto_auth_db_test";
const MONGODB_CONN_URL = process.env.MOSQUITTO_AUTH_MONGODB_CONN_URL || "mongodb://localhost:27017";
let DB = null;
let CLIENT = null;
function connectDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (CLIENT === null) {
            CLIENT = yield mongodb_1.MongoClient.connect(MONGODB_CONN_URL, { useUnifiedTopology: true });
        }
    });
}
function getDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectDatabase();
        if (DB === null) {
            DB = CLIENT.db(DB_NAME);
        }
        return DB;
    });
}
exports.getDatabase = getDatabase;
