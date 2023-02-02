'use strict';

export default class SessionService {

  constructor (deps) {
    this.httpStatusCodes = deps.httpStatusCodes;
    this.jwt = deps.jwt;
    this.encryptor = deps.encryptor;
    this.logger = deps.logger;
    this.config = deps.config;
    this.moment = deps.moment;
    this.userService = deps.userService;
    this.crypto = deps.crypto;
  }

  _generateNumberWithNDigits (n) {
    const add = 1;
    let max = 12 - add;
    if ( n > max ) {
      return this._generateNumberWithNDigits(max) + this._generateNumberWithNDigits(n - max);
    }
    max = Math.pow(10, n+add);
    const min = max/10;
    const number = Math.floor( Math.random() * (max - min + 1) ) + min;
    return ('' + number).substring(add);
  }

  _createToken ({ _id, email }) {
    const thirdParty = this.config.env !== 'local';
    return this.jwt.sign({ user: { email }, thirdParty }, this.config.security.privateKey, {
      algorithm: this.config.security.algorithm,
      subject: _id.toString(),
      expiresIn: this.config.security.expirationTime,
    });
  }

  _decryptPass (password) {
    try {
      const encryptor = new this.encryptor(this.config.security.privateKey, 'private');
      return encryptor.decrypt(password, 'utf8');
    } catch (err) {
      this.logger.error('Pass with wrong encryption', err);
      return Promise.reject({ statusCode: this.httpStatusCodes.UNAUTHORIZED });
    }
  }
  

  async login ({ email, password }) {
    const passDecrypted = await this._decryptPass(password);
    let user = await this.userService.get({ email }, true, 'session');
    if (!user) {
      this.logger.error(`Error at login user with email: ${email}`);
      return Promise.reject({ statusCode: this.httpStatusCodes.UNAUTHORIZED, data: [ { i18nKey: 'user.notFound' } ] });
    }
    const seed = this.crypto.createHash('sha256').update(`${user._id}${this.config.security.salt}`, 'utf8').digest('base64');
    const hashedPassword = this.crypto.createHash('sha256').update(`${passDecrypted}${seed}`, 'utf8').digest('base64');
    user = await this.userService.get({ email, password: hashedPassword }, true, 'session');
    if (!user) {
      this.logger.error(`Error at login user with email: ${email}`);
      return Promise.reject({ statusCode: this.httpStatusCodes.UNAUTHORIZED, data: [ { i18nKey: 'user.notFound' } ] });
    }
    const token = this._createToken(user);
    return { accessToken: token , tokenType: 'Bearer', user };
  }

  async register (newUser, isAdmin) {
    const userExists = await this.userService.get({ email: newUser.email });
    if (userExists) {
      this.logger.error(`User with email ${newUser.email} already exists in DB`);
      return Promise.reject({ statusCode: this.httpStatusCodes.UNAUTHORIZED, data: [ { i18nKey: 'user.alreadyExists' } ] });
    }
    newUser.profileId = isAdmin ? this.config.admin.profileId : this.config.user.profileId;
    const user = await this.userService.create(newUser);
    const passDecrypted = await this._decryptPass(newUser.password);
    const seed = this.crypto.createHash('sha256').update(`${user._id}${this.config.security.salt}`, 'utf8').digest('base64');
    const hashedPassword = this.crypto.createHash('sha256').update(`${passDecrypted}${seed}`, 'utf8').digest('base64');
    await this.userService.updatePassword(user._id, hashedPassword);
    this.logger.info(`New user registered -> (_id: ${user._id}) (email: ${user.email})`);
  }


}
