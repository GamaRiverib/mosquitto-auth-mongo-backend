import { Acc, getPasswordHash } from "mosquitto-auth-manager";
import { RuleMongoEntity, UserMongoEntity } from "../build";

export const users: UserMongoEntity[] = [
  new UserMongoEntity({
    id: undefined,
    username: "user1",
    password: getPasswordHash("test1"),
    acls: [{
      acc: Acc.READ,
      topic: "users/r/user1"
    }]
  }),
  new UserMongoEntity({
    id: undefined,
    username: "user2",
    password: getPasswordHash("test2")
  }),
  new UserMongoEntity({
    id: undefined,
    username: "user3",
    password: getPasswordHash("test3")
  }),
  new UserMongoEntity({
    id: undefined,
    username: "user4",
    password: getPasswordHash("test4")
  }),
  new UserMongoEntity({
    id: undefined,
    username: "user5",
    password: getPasswordHash("test5")
  })
];

export const rules: RuleMongoEntity[] = [
  new RuleMongoEntity({
    id: undefined,
    type: "topic",
    value: "test/1/write",
    acc: Acc.WRITE
  }),
  new RuleMongoEntity({
    id: undefined,
    type: "topic",
    value: "test/1/read",
    acc: Acc.READ
  }),
  new RuleMongoEntity({
    id: undefined,
    type: "topic",
    value: "test/2/rw",
    acc: Acc.READ_WRITE
  }),
  new RuleMongoEntity({
    id: undefined,
    type: "pattern",
    value: "test/2/#",
    acc: Acc.READ
  }),
  new RuleMongoEntity({
    id: undefined,
    type: "topic",
    value: "test/+/3",
    acc: Acc.WRITE
  })
];
