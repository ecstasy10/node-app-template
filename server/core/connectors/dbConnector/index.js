'use strict';

import { PostgresDbConnector } from './postgresDbConnector.js';

// TODO - cache session for outer logins
// import RedisDbConnector from './redisDbConnector.js';

// TODO - store trackings on mongoDb
// import mongoDbConnector from './connectors/dbConnector/mongoDbConnector.js';

export default class DbConnector {

  constructor (deps) {
    this.deps = deps;
    this.mainDb = new PostgresDbConnector(this.deps);
    // TODO - cache session for outer logins
    // this.cacheDb = new RedisDbConnector(this.deps);
    // TODO - store trackings on mongoDb
    // return this.mongoDb();
  }

  async connect () {
    await this.mainDb.connect();
    // this.cacheDb.connect();
  }

  getMainDb () {
    return this.mainDb;
  }

  // getCacheDb () {
  //   return this.cacheDb;
  // }

  // getSecondaryDb () {
  //   return this.mongoDb();
  // }

}