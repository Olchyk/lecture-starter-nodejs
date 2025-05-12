import { Router } from 'express';
import { fighterService } from '../services/fighterService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';
import {
  createFighterValid,
  updateFighterValid,
} from '../middlewares/fighter.validation.middleware.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const fighters = await fighterService.getAll();
    res.data = fighters;
  } catch (error) {
    res.err = { message: error.message };
  } finally {
    next();
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const fighter = await fighterService.getById(req.params.id);
    if (!fighter) {
      res.statusCode = 404;
      res.err = { message: 'Fighter not found' };
    } else {
      res.data = fighter;
    }
  } catch (error) {
    res.err = { message: error.message };
  } finally {
    next();
  }
});

router.post('/', createFighterValid, async (req, res, next) => {
  try {
    const created = await fighterService.create(req.body);
    res.data = created;
  } catch (error) {
    res.statusCode = 400;
    res.err = { message: error.message };
  } finally {
    next();
  }
});

router.patch('/:id', updateFighterValid, async (req, res, next) => {
  try {
    const updated = await fighterService.update(req.params.id, req.body);
    if (!updated) {
      res.statusCode = 404;
      res.err = { message: 'Fighter not found' };
    } else {
      res.data = updated;
    }
  } catch (error) {
    res.statusCode = 400;
    res.err = { message: error.message };
  } finally {
    next();
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await fighterService.delete(req.params.id);
    if (!deleted) {
      res.statusCode = 404;
      res.err = { message: 'Fighter not found' };
    } else {
      res.data = { success: true };
    }
  } catch (error) {
    res.err = { message: error.message };
  } finally {
    next();
  }
});

router.use(responseMiddleware);

export { router };
