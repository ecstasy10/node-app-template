'use strict';

const { Op, QueryTypes, Sequelize } = require('sequelize');

export class PostgresDbConnector {

  constructor (deps) {
    this.deps = deps;
    this.config = deps.config;
    this.logger = deps.logger;
    this.associations = false;
    this.dbs = this.config.db.names
      .map(dbName => this.config.db.slaves.length ?
        new Sequelize({
          port: this.config.db.port,
          database: dbName.name,
          schema: dbName.schema,
          databaseKey: dbName.key,
          dialect: this.config.db.dialect,
          logging: msg => this.logger.debug(msg),
          define: this.config.db.define,
          replication: {
            write: {
              host: this.config.db.host,
              username: this.config.db.user,
              password: this.config.db.pass,
            },
            read: this.config.db.slaves.map(host => ({
              host,
              username: this.config.db.user,
              password: this.config.db.pass,
            })),
          }
        }) :
        new Sequelize({
          host: this.config.db.host,
          port: this.config.db.port,
          database: dbName.name,
          schema: dbName.schema,
          databaseKey: dbName.key,
          username: this.config.db.user,
          password: this.config.db.pass,
          dialect: this.config.db.dialect,
          logging: msg => this.logger.debug(msg),
          define: this.config.db.define
        }))
      .map(db => {
        db.dialect.supports.schemas = true;
        return db;
      });
  }

  _makeAssociations () {
    if (!this.associations) {
      const DAOs = Object.keys(this.deps).reduce((acc, dep) => {
        if (dep.includes('Dao')) {
          acc.push(this.deps[dep]);
        }
        return acc;
      }, []);
      for (const DAO of DAOs) {
        DAO.makeAssociations();
      }
      this.associations = true;
    }
  }

  _getDbByKey (key) {
    return this.dbs.find(db => db.options.databaseKey === key);
  }

  getSchema (key = 'core') {
    return this._getDbByKey(key);
  }

  getOp () {
    return Op;
  }

  getQueryTypes () {
    return QueryTypes;
  }

  async connect () {
    try {
      this._makeAssociations();
      for (const db of this.dbs) {
        await db.authenticate();
        await db.sync();
      }
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  abstractDAO (dao, key = 'core') {
    return {
      makeAssociations: () => {},
      getDAO: () => {
        return this._getDbByKey(key).models[dao.name];
      }
    };
  }

}
