const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexEmail } = require('../utils/constants');
const {
  login,
} = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(regexEmail),
    password: Joi.string().required().min(3),
  }).unknown(true),
}), login);

module.exports = router;
