import { fighterRepository } from '../repositories/fighterRepository.js';
import { v4 as uuidv4 } from 'uuid';

class FighterService {
  async getAll() {
    return await fighterRepository.getAll();
  }

  async getById(id) {
    return await fighterRepository.getById(id);
  }

  async create(data) {
    const isTaken = await fighterRepository.isNameTaken(data.name);
    if (isTaken) {
      throw new Error('Fighter with this name already exists');
    }

    const newFighter = {
      id: uuidv4(),
      health: data.health ?? 85, // якщо не передано — ставимо 85
      ...data,
    };

    return await fighterRepository.create(newFighter);
  }

  async update(id, data) {
    const existing = await fighterRepository.getById(id);
    if (!existing) {
      return null;
    }

    return await fighterRepository.update(id, data);
  }

  async delete(id) {
    return await fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
