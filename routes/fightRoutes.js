import { Router } from 'express';
import { fightService } from '../services/fightService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { fighter1, fighter2 } = req.body;

    if (!fighter1 || !fighter2) {
      res.statusCode = 400;
      res.err = { message: 'Both fighter1 and fighter2 IDs are required' };
      return next();
    }

    const fightResult = await fightService.fight(fighter1, fighter2);
    res.data = fightResult;
  } catch (error) {
    res.statusCode = 400;
    res.err = { message: error.message };
  } finally {
    next();
  }
});

router.get('/', async (req, res, next) => {
  try {
    const fights = await fightService.getAll();
    res.data = fights;
  } catch (error) {
    res.err = { message: error.message };
  } finally {
    next();
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const fight = await fightService.getById(req.params.id);
    if (!fight) {
      res.statusCode = 404;
      res.err = { message: 'Fight not found' };
    } else {
      res.data = fight;
    }
  } catch (error) {
    res.err = { message: error.message };
  } finally {
    next();
  }
});

router.use(responseMiddleware);

export { router };
