const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexUrl, regexEmail } = require('../utils/constants');
const {
  addUser,
} = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2),
    avatar: Joi.string().pattern(regexUrl),
    email: Joi.string().required().pattern(regexEmail),
    password: Joi.string().required().min(3),
  }).unknown(true),
}), addUser);

module.exports = router;
