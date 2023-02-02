'use strict';

const api = {
  prefix: '/api/v1',
  version: '1.0.0',
  history: [
    { version: '1.0.0' },
  ],
};

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  api,
  cors: {
    origin: (process.env.CORS_ORIGIN || '').split(','),
    credentials: true,
    sameSite: (process.env.CORS_COOKIE_SAME_SITE && JSON.parse(process.env.CORS_COOKIE_SAME_SITE)),
  },
  security: {
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
    salt: process.env.SALT,
    expirationTime: parseInt(process.env.EXPIRATION_TIME),
    algorithm: 'RS512',
    cookieSessionSecure: process.env.COOKIE_SESSION_SECURE && JSON.parse(process.env.COOKIE_SESSION_SECURE),
    otpMinutesExpiration: parseInt(process.env.OTP_MINUTES_EXPIRATION),
    minutesUntilMaxRequestsAreRefreshed: parseInt(process.env.MINUTES_UNTIL_MAX_REQUESTS_ARE_REFRESHED),
    maxRequestsAllowed: parseInt(process.env.MAX_REQUESTS_ALLOWED),
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    user: process.env.REDIS_USER || undefined,
    pass: process.env.REDIS_PASSWORD || undefined,
    db: (process.env.REDIS_DB && parseInt(process.env.REDIS_DB)) || undefined,
    url: process.env.REDIS_URL || undefined
  },
  db: {
    host: process.env.DB_HOST,
    names: process.env.DB_NAMES && JSON.parse(process.env.DB_NAMES),
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    dialect: 'postgres',
    slaves: process.env.DB_SLAVES && JSON.parse(process.env.DB_SLAVES),
    define: {
      defaultScope: {},
    }
  },
  mailer: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  },
  defaultLanguage: 'es',
  publicEndpoints: [
    { method: 'post', url: `${api.prefix}/session/login` },
    { method: 'post', url: `${api.prefix}/session/logout` },
    { method: 'post', url: `${api.prefix}/session/register` },
  ],
  allowedEndpoints: [
    { method: 'post', url: `${api.prefix}/session/login` },
    { method: 'post', url: `${api.prefix}/session/logout` },
    { method: 'post', url: `${api.prefix}/session/register` },
  ],
  imageMimeTypesAllowed: [
    'image/jpeg',
    'image/png',
  ],
  resourceMimeTypesAllowed: [
    'application/pdf',
    'image/jpeg',
    'image/png',
  ],
  logs: {
    level: process.env.LOG_LEVEL,
    logPath: process.env.LOG_PATH,
    graylogEnabled: process.env.GRAYLOG_ENABLED && JSON.parse(process.env.GRAYLOG_ENABLED),
    graylog: {
      enabled: process.env.GRAYLOG_ENABLED && JSON.parse(process.env.GRAYLOG_ENABLED),
      host: process.env.GRAYLOG_HOST,
      port: process.env.GRAYLOG_PORT,
      facility: process.env.GRAYLOG_FACILITY,
      level: process.env.GRAYLOG_LEVEL,
    }
  },
};
