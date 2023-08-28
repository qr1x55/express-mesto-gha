const mongoose = require('mongoose');
const Card = require('../models/card');

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Не найдена карточка с ID: ${req.params.cardId}` });
        return;
      }
      res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: `Некорректный ID: ${req.params.cardId}` });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Не найдена карточка с ID: ${req.params.cardId}` });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: `Некорректный ID: ${req.params.cardId}` });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.removeLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Не найдена карточка с ID: ${req.params.cardId}` });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: `Некорректный ID: ${req.params.cardId}` });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
