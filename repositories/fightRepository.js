import { BaseRepository } from './baseRepository.js';

class FightRepository extends BaseRepository {
  constructor() {
    super('fights');
  }

  async getAll() {
    return await this.getData();
  }

  async getById(id) {
    const fights = await this.getData();
    return fights.find((fight) => fight.id === id);
  }

  async create(fightData) {
    const fights = await this.getData();
    fights.push(fightData);
    this.dbContext.write();
    return fightData;
  }
}

const fightRepository = new FightRepository();

export { fightRepository };
