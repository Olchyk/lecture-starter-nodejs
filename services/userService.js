import { userRepository } from '../repositories/userRepository.js';
import { v4 as uuidv4 } from 'uuid'; // для генерації id

class UserService {
  async getAll() {
    return await userRepository.getAll();
  }

  async getById(id) {
    return await userRepository.getById(id);
  }

  async create(userData) {
    const { email, phone } = userData;

    const isTaken = await userRepository.isEmailOrPhoneTaken(email, phone);
    if (isTaken) {
      throw new Error('User with this email or phone already exists');
    }

    const newUser = {
      id: uuidv4(),
      ...userData,
    };

    return await userRepository.create(newUser);
  }

  async update(id, data) {
    const existing = await userRepository.getById(id);
    if (!existing) {
      return null;
    }

    return await userRepository.update(id, data);
  }

  async delete(id) {
    const deleted = await userRepository.delete(id);
    return deleted;
  }
}

const userService = new UserService();

export { userService };
