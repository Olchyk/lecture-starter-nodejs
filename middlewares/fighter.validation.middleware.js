import { FIGHTER } from '../models/fighter.js';

const FIGHTER_FIELDS = Object.keys(FIGHTER);
const REQUIRED_FIELDS_CREATE = FIGHTER_FIELDS.filter(
  (field) => field !== 'id' && field !== 'health'
);

const isValidPower = (p) => typeof p === 'number' && p >= 1 && p <= 100;
const isValidDefense = (d) => typeof d === 'number' && d >= 1 && d <= 10;
const isValidHealth = (h) => typeof h === 'number' && h >= 80 && h <= 120;

const createFighterValid = (req, res, next) => {
  const data = req.body;

  if ('id' in data) {
    return res
      .status(400)
      .json({ error: true, message: "Field 'id' is not allowed" });
  }

  const invalidKeys = Object.keys(data).filter(
    (key) => !FIGHTER_FIELDS.includes(key)
  );
  if (invalidKeys.length > 0) {
    return res
      .status(400)
      .json({
        error: true,
        message: `Extra fields are not allowed: ${invalidKeys.join(', ')}`,
      });
  }

  for (const field of REQUIRED_FIELDS_CREATE) {
    if (!(field in data)) {
      return res
        .status(400)
        .json({ error: true, message: `Missing required field: ${field}` });
    }
  }

  if (!isValidPower(data.power)) {
    return res
      .status(400)
      .json({
        error: true,
        message: 'Power must be a number between 1 and 100',
      });
  }

  if (!isValidDefense(data.defense)) {
    return res
      .status(400)
      .json({
        error: true,
        message: 'Defense must be a number between 1 and 10',
      });
  }

  if ('health' in data && !isValidHealth(data.health)) {
    return res
      .status(400)
      .json({ error: true, message: 'Health must be between 80 and 120' });
  }

  // Присвоїти health за замовчуванням
  if (!('health' in data)) {
    data.health = 85;
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const data = req.body;

  if ('id' in data) {
    return res
      .status(400)
      .json({ error: true, message: "Field 'id' is not allowed" });
  }

  const invalidKeys = Object.keys(data).filter(
    (key) => !FIGHTER_FIELDS.includes(key)
  );
  if (invalidKeys.length > 0) {
    return res
      .status(400)
      .json({
        error: true,
        message: `Extra fields are not allowed: ${invalidKeys.join(', ')}`,
      });
  }

  if (Object.keys(data).length === 0) {
    return res
      .status(400)
      .json({
        error: true,
        message: 'At least one field must be provided for update',
      });
  }

  if ('power' in data && !isValidPower(data.power)) {
    return res
      .status(400)
      .json({
        error: true,
        message: 'Power must be a number between 1 and 100',
      });
  }

  if ('defense' in data && !isValidDefense(data.defense)) {
    return res
      .status(400)
      .json({
        error: true,
        message: 'Defense must be a number between 1 and 10',
      });
  }

  if ('health' in data && !isValidHealth(data.health)) {
    return res
      .status(400)
      .json({ error: true, message: 'Health must be between 80 and 120' });
  }

  next();
};

export { createFighterValid, updateFighterValid };
