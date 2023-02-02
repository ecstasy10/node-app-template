'use strict';

const Redis = require('ioredis');

export default class RedisDbConnector {
  
  constructor ({ config }) {
    this.redisConfig = config.redis.url || ({
      host: config.redis.host,
      port: config.redis.port,
      username: config.redis.user,
      password: config.redis.pass,
      db: config.redis.db,
    });
    this.client = new Redis(this.redisConfig);
  }

  connect () {
    this.client.auth(this.redisConfig.password);
  }

  get (str) {
    this.client.get(str);
  }
  
}
