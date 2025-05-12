import { USER_FIELDS, REQUIRED_FIELDS_CREATE } from '../models/user.js';

const isGmail = (email) =>
  typeof email === 'string' && email.endsWith('@gmail.com');
const isUkrPhone = (phone) => /^\+380\d{9}$/.test(phone);
const isValidPassword = (password) =>
  typeof password === 'string' && password.length >= 4;

const createUserValid = (req, res, next) => {
  const data = req.body;

  // Не можна передавати id
  if ('id' in data) {
    res.statusCode = 400;
    return res.json({ error: true, message: "Field 'id' is not allowed" });
  }

  // Заборонені зайві поля
  const invalidKeys = Object.keys(data).filter(
    (key) => !USER_FIELDS.includes(key)
  );
  if (invalidKeys.length > 0) {
    res.statusCode = 400;
    return res.json({
      error: true,
      message: `Extra fields are not allowed: ${invalidKeys.join(', ')}`,
    });
  }

  // Перевірка наявності всіх обов’язкових полів
  for (const field of REQUIRED_FIELDS_CREATE) {
    if (!data[field]) {
      res.statusCode = 400;
      return res.json({
        error: true,
        message: `Missing required field: ${field}`,
      });
    }
  }

  // Валідація формату
  if (!isGmail(data.email)) {
    return res
      .status(400)
      .json({ error: true, message: 'Email must be a valid Gmail address' });
  }

  if (!isUkrPhone(data.phone)) {
    return res
      .status(400)
      .json({ error: true, message: 'Phone must match +380xxxxxxxxx format' });
  }

  if (!isValidPassword(data.password)) {
    return res
      .status(400)
      .json({ error: true, message: 'Password must be at least 4 characters' });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const data = req.body;

  // Заборонено передавати id
  if ('id' in data) {
    return res
      .status(400)
      .json({ error: true, message: "Field 'id' is not allowed" });
  }

  // Заборонені зайві поля
  const invalidKeys = Object.keys(data).filter(
    (key) => !USER_FIELDS.includes(key)
  );
  if (invalidKeys.length > 0) {
    return res
      .status(400)
      .json({
        error: true,
        message: `Extra fields are not allowed: ${invalidKeys.join(', ')}`,
      });
  }

  // Повинно бути хоч одне поле для оновлення
  if (Object.keys(data).length === 0) {
    return res
      .status(400)
      .json({
        error: true,
        message: 'At least one field must be provided for update',
      });
  }

  // Якщо якісь поля є — перевіримо їх формат
  if (data.email && !isGmail(data.email)) {
    return res
      .status(400)
      .json({ error: true, message: 'Email must be a valid Gmail address' });
  }

  if (data.phone && !isUkrPhone(data.phone)) {
    return res
      .status(400)
      .json({ error: true, message: 'Phone must match +380xxxxxxxxx format' });
  }

  if (data.password && !isValidPassword(data.password)) {
    return res
      .status(400)
      .json({ error: true, message: 'Password must be at least 4 characters' });
  }

  next();
};

export { createUserValid, updateUserValid };
