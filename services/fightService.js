import { fightRepository } from '../repositories/fightRepository.js';
import { fighterRepository } from '../repositories/fighterRepository.js';
import { v4 as uuidv4 } from 'uuid';

class FightService {
  async getAll() {
    return await fightRepository.getAll();
  }

  async getById(id) {
    return await fightRepository.getById(id);
  }

  async fight(fighter1Id, fighter2Id) {
    const fighter1 = await fighterRepository.getById(fighter1Id);
    const fighter2 = await fighterRepository.getById(fighter2Id);

    if (!fighter1 || !fighter2) {
      throw new Error('One or both fighters not found');
    }

    const log = [];

    let f1Health = fighter1.health;
    let f2Health = fighter2.health;

    while (f1Health > 0 && f2Health > 0) {
      const f1Shot = Math.floor(Math.random() * fighter1.power);
      const f2Shot = Math.floor(Math.random() * fighter2.power);

      const f1Effective = Math.max(0, f1Shot - fighter2.defense);
      const f2Effective = Math.max(0, f2Shot - fighter1.defense);

      f2Health -= f1Effective;
      f1Health -= f2Effective;

      log.push({
        fighter1Shot: f1Effective,
        fighter2Shot: f2Effective,
        fighter1Health: Math.max(f1Health, 0),
        fighter2Health: Math.max(f2Health, 0),
      });
    }

    const fightResult = {
      id: uuidv4(),
      fighter1: fighter1.id,
      fighter2: fighter2.id,
      log,
    };

    await fightRepository.create(fightResult);
    return fightResult;
  }
}

const fightService = new FightService();

export { fightService };
