import { Collection, Cursor, Db, DeleteWriteOpResultObject, FilterQuery, 
         InsertOneWriteOpResult, ObjectId, UpdateWriteOpResult } from "mongodb";

import { ID, MosquittoAuthRepository, Rule, RuleEntity, User, UserEntity } from "mosquitto-auth-manager";

const USERS_COLLECTION_NAME: string = process.env.MOSQUITTO_AUTH_USERS_COLLECTION_NAME || "users";
const ACLS_COLLECTION_NAME: string = process.env.MOSQUITTO_AUTH_ACLS_COLLECTION_NAME || "acls";

export class UserMongoEntity extends UserEntity {

  constructor(userEntity?: UserEntity | User) {
    super();
    if (userEntity) {
      this.username = userEntity.username;
      this.superuser = userEntity.superuser;
      this.password = userEntity.password;
      this.acls = userEntity.acls;
    }
  }

  set _id(val: any) {
    this.id = val;
  }

  get _id(): any {
    return this.id;
  }

}

export class RuleMongoEntity extends RuleEntity {

  constructor(ruleEntity?: RuleEntity | Rule) {
    super();
    if (ruleEntity) {
      this.value = ruleEntity.value;
      this.type = ruleEntity.type;
      this.acc = ruleEntity.acc;
    }
  }

  set _id(val: any) {
    this.id = val;
  }

  get _id(): any {
    return this.id;
  }
  
}

export class MosquittoAuthMongoRepository implements MosquittoAuthRepository {

  private usersCollection: Collection<UserMongoEntity>;
  private aclsCollection: Collection<RuleMongoEntity>;

  constructor(private db: Db) {
    this.usersCollection = this.db.collection(USERS_COLLECTION_NAME);
    this.aclsCollection = this.db.collection(ACLS_COLLECTION_NAME);
  }


  findUsers(query?: string, page?: number, limit?: number): Promise<UserEntity[]> {
    const q: FilterQuery<UserMongoEntity> = { };
    if (query) {
      q.username = query;
    }
    const cursor: Cursor<UserMongoEntity> = this.usersCollection.find(q);
    limit = limit || 100;
    page = page || 1;
    const skip: number = limit * (page - 1);
    cursor.skip(skip).limit(limit);
    return cursor.toArray();
  }

  getUserById(id: ID): Promise<UserEntity> {
    const q: FilterQuery<UserMongoEntity> = { id };
    return this.usersCollection.findOne(q);
  }

  getUser(username: string): Promise<UserEntity> {
    const q: FilterQuery<UserMongoEntity> = { username };
    return this.usersCollection.findOne(q);
  }

  async createUser(user: User): Promise<UserEntity> {
    if (!user) {
      throw new Error("User is required");
    }
    const entity = new UserMongoEntity(user);
    const r: InsertOneWriteOpResult<UserMongoEntity> = 
      await this.usersCollection.insertOne(entity);
    if (r.insertedCount !== 1) {
      throw new Error("Error inserting user");
    }
    return entity;
  }

  async updateUser(user: UserEntity): Promise<void> {
    if (!user) {
      throw new Error("User is required");
    }
    const q: FilterQuery<UserMongoEntity> = { id:  user.id };
    const r: UpdateWriteOpResult = 
      await this.usersCollection.updateOne(q, { $set: user });
    if (r.modifiedCount < 1) {
      throw new Error("Error updating user");
    }
  }

  async deleteUserById(id: ID): Promise<void> {
    const q: FilterQuery<UserMongoEntity> = { id };
    const r: DeleteWriteOpResultObject =
      await this.usersCollection.deleteOne(q);
    if (r.deletedCount < 1)  {
      throw new Error("Error deleting user");
    }
  }

  async deleteUser(username: string): Promise<void> {
    const q: FilterQuery<UserMongoEntity> = { username };
    const r: DeleteWriteOpResultObject =
      await this.usersCollection.deleteOne(q);
    if (r.deletedCount < 1) {
      throw new Error("Error deleting user");
    }
  }

  getRules(): Promise<RuleEntity[]> {
    return this.aclsCollection.find({}).toArray();
  }

  getRuleById(id: ID): Promise<RuleEntity> {
    const q: FilterQuery<RuleMongoEntity> = { id };
    return this.aclsCollection.findOne(q);
  }

  async createRule(rule: Rule): Promise<RuleEntity> {
    if (!rule) {
      throw new Error("Rule is required");
    }
    const entity = new RuleMongoEntity(rule);
    const r: InsertOneWriteOpResult<RuleMongoEntity> =
      await this.aclsCollection.insertOne(entity);
    if (r.insertedCount !== 1) {
      throw new Error("Error inserting rule");
    }
    return entity;
  }

  async updateRule(rule: RuleEntity): Promise<void> {
    if (!rule) {
      throw new Error("Rule is required");
    }
    const q: FilterQuery<RuleMongoEntity> = { id:  rule.id };
    const r: UpdateWriteOpResult =
      await this.aclsCollection.updateOne(q, { $set: rule });
    if (r.modifiedCount < 1) {
      throw new Error("Error updating rule");
    }
  }

  async deleteRuleById(id: ID): Promise<void> {
    const q: FilterQuery<RuleMongoEntity> = { id: id };
    const r: DeleteWriteOpResultObject =
      await this.aclsCollection.deleteOne(q);
    if (r.deletedCount < 1)  {
      throw new Error("Error deleting rule");
    }
  }

}