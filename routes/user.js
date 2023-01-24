const router = require('express').Router();
const {
  getUser,
  changeUser,
} = require('../controllers/user');
const { validateUserPatch } = require('../validation');

router.get('/me', getUser);
router.patch('/me', validateUserPatch, changeUser);

module.exports = router;
