const router = require('express').Router();
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  getUser,
  changeUser,
} = require('../controllers/user');

router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), changeUser);

module.exports = router;