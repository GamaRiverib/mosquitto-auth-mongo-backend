process.env.NODE_ENV = "test";
process.env.HASHER_ITERATIONS = "100000";
process.env.HASHER_KEYLEN = "64";
process.env.HASHER_ALGORITHM = "sha512";
process.env.SALT_ENCODING = "utf-8";
process.env.SALT_SIZE = "16";
process.env.MOSQUITTO_AUTH_MONGODB_CONN_URL = "mongodb://localhost:27017";
process.env.MOSQUITTO_AUTH_DB_NAME = "mosquitto-auth-db-test";
process.env.MOSQUITTO_AUTH_USERS_COLLECTION_NAME = "users";
process.env.MOSQUITTO_AUTH_ACLS_COLLECTION_NAME = "acls";
