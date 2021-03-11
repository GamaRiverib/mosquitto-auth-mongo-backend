import { Acc, getPBKDF2Password } from "mosquitto-auth-manager";
import { RuleMongoEntity, UserMongoEntity } from "../build";

export const users: UserMongoEntity[] = [
  new UserMongoEntity({
    username: "user1",
    password: getPBKDF2Password("test1"),
    acls: [{
      acc: Acc.READ,
      topic: "users/r/user1"
    }]
  }),
  new UserMongoEntity({
    username: "user2",
    password: getPBKDF2Password("test2")
  }),
  new UserMongoEntity({
    username: "user3",
    password: getPBKDF2Password("test3")
  }),
  new UserMongoEntity({
    username: "user4",
    password: getPBKDF2Password("test4")
  }),
  new UserMongoEntity({
    username: "user5",
    password: getPBKDF2Password("test5")
  })
];

export const rules: RuleMongoEntity[] = [
  new RuleMongoEntity({
    type: "topic",
    value: "test/1/write",
    acc: Acc.WRITE
  }),
  new RuleMongoEntity({
    type: "topic",
    value: "test/1/read",
    acc: Acc.READ
  }),
  new RuleMongoEntity({
    type: "topic",
    value: "test/2/rw",
    acc: Acc.READ_WRITE
  }),
  new RuleMongoEntity({
    type: "pattern",
    value: "test/2/#",
    acc: Acc.READ
  }),
  new RuleMongoEntity({
    type: "topic",
    value: "test/+/3",
    acc: Acc.WRITE
  })
];
