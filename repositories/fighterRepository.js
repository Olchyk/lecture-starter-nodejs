import { BaseRepository } from './baseRepository.js';

class FighterRepository extends BaseRepository {
  constructor() {
    super('fighters');
  }

  async getAll() {
    return await this.getData();
  }

  async getById(id) {
    const fighters = await this.getData();
    return fighters.find((f) => f.id === id);
  }

  async create(fighterData) {
    const fighters = await this.getData();
    fighters.push(fighterData);
    this.dbContext.write();
    return fighterData;
  }

  async update(id, data) {
    const fighters = await this.getData();
    const index = fighters.findIndex((f) => f.id === id);
    if (index === -1) return null;

    fighters[index] = { ...fighters[index], ...data };
    this.dbContext.write();
    return fighters[index];
  }

  async delete(id) {
    const fighters = await this.getData();
    const index = fighters.findIndex((f) => f.id === id);
    if (index === -1) return false;

    fighters.splice(index, 1);
    this.dbContext.write();
    return true;
  }

  async isNameTaken(name) {
    const fighters = await this.getData();
    return fighters.some((f) => f.name.toLowerCase() === name.toLowerCase());
  }
}

const fighterRepository = new FighterRepository();

export { fighterRepository };
