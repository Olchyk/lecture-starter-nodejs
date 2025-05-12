import { Router } from 'express';
import { userService } from '../services/userService.js';
import {
  createUserValid,
  updateUserValid,
} from '../middlewares/user.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.data = users;
  } catch (error) {
    res.err = { message: error.message };
  } finally {
    next();
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) {
      res.statusCode = 404;
      res.err = { message: 'User not found' };
    } else {
      res.data = user;
    }
  } catch (error) {
    res.err = { message: error.message };
  } finally {
    next();
  }
});

router.post('/', createUserValid, async (req, res, next) => {
  try {
    const createdUser = await userService.create(req.body);
    res.data = createdUser;
  } catch (error) {
    res.statusCode = 400;
    res.err = { message: error.message };
  } finally {
    next();
  }
});

router.patch('/:id', updateUserValid, async (req, res, next) => {
  try {
    const updatedUser = await userService.update(req.params.id, req.body);
    if (!updatedUser) {
      res.statusCode = 404;
      res.err = { message: 'User not found' };
    } else {
      res.data = updatedUser;
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
    const deleted = await userService.delete(req.params.id);
    if (!deleted) {
      res.statusCode = 404;
      res.err = { message: 'User not found' };
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
