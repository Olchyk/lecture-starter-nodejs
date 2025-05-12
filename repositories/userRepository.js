import { BaseRepository } from './baseRepository.js';

class UserRepository extends BaseRepository {
  constructor() {
    super('users');
  }

  async getById(id) {
    const users = this.getAll();
    return users.find((user) => user.id === id);
  }

  async create(userData) {
    const users = this.getAll();
    users.push(userData);
    this.dbContext.write();
    return userData;
  }

  async update(id, data) {
    const users = this.getAll();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...data };
    this.dbContext.write();
    return users[index];
  }

  async delete(id) {
    const users = this.getAll();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    users.splice(index, 1);
    this.dbContext.write();
    return true;
  }

  async isEmailOrPhoneTaken(email, phone) {
    const users = this.getAll();
    return users.some(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() || user.phone === phone
    );
  }
}

const userRepository = new UserRepository();

export { userRepository };
