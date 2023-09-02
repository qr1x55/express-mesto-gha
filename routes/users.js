const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regexUrl = require('../utils/constants');

const {
  getUsers, getUserById, editUserInfo, editUserAvatar, getMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), editUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regexUrl),
  }),
}), editUserAvatar);

module.exports = router;
