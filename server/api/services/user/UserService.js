'use strict';

export default class UserService {

  constructor (deps) {
    this.userRepository = deps.userRepository;
  }

  async get (filters, isStrict, scope, isFull) {
    const user = await this.userRepository.find(filters, isStrict, scope, isFull);
    return user;
  }

  async getFullSessionUser (userId) {
    const user = await this.userRepository.getFullSessionUser(userId);
    return user;
  }

  async updatePassword (userId, password) {
    const user = await this.userRepository.updatePassword(userId, password);
    return user;
  }

  async create (newUser) {
    const user = await this.userRepository.create(newUser);
    return user;
  }

  async getEndpoints (userId) {
    const endpoints = await this.userRepository.findEndpoints(userId);
    return endpoints;
  }

  async getHotelGroups (userId) {
    const hotelGroups = await this.userRepository.findHotelGroups(userId);
    return hotelGroups;
  }

}
