"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = exports.users = void 0;
const mosquitto_auth_manager_1 = require("mosquitto-auth-manager");
const build_1 = require("../build");
exports.users = [
    new build_1.UserMongoEntity({
        id: undefined,
        username: "user1",
        password: mosquitto_auth_manager_1.getPasswordHash("test1"),
        acls: [{
                acc: mosquitto_auth_manager_1.Acc.READ,
                topic: "users/r/user1"
            }]
    }),
    new build_1.UserMongoEntity({
        id: undefined,
        username: "user2",
        password: mosquitto_auth_manager_1.getPasswordHash("test2")
    }),
    new build_1.UserMongoEntity({
        id: undefined,
        username: "user3",
        password: mosquitto_auth_manager_1.getPasswordHash("test3")
    }),
    new build_1.UserMongoEntity({
        id: undefined,
        username: "user4",
        password: mosquitto_auth_manager_1.getPasswordHash("test4")
    }),
    new build_1.UserMongoEntity({
        id: undefined,
        username: "user5",
        password: mosquitto_auth_manager_1.getPasswordHash("test5")
    })
];
exports.rules = [
    new build_1.RuleMongoEntity({
        id: undefined,
        type: "topic",
        value: "test/1/write",
        acc: mosquitto_auth_manager_1.Acc.WRITE
    }),
    new build_1.RuleMongoEntity({
        id: undefined,
        type: "topic",
        value: "test/1/read",
        acc: mosquitto_auth_manager_1.Acc.READ
    }),
    new build_1.RuleMongoEntity({
        id: undefined,
        type: "topic",
        value: "test/2/rw",
        acc: mosquitto_auth_manager_1.Acc.READ_WRITE
    }),
    new build_1.RuleMongoEntity({
        id: undefined,
        type: "pattern",
        value: "test/2/#",
        acc: mosquitto_auth_manager_1.Acc.READ
    }),
    new build_1.RuleMongoEntity({
        id: undefined,
        type: "topic",
        value: "test/+/3",
        acc: mosquitto_auth_manager_1.Acc.WRITE
    })
];
