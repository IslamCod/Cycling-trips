const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const { checkAuth } = require('../middleware/checkAuth');

const SALT = 10;

router.get('/', async (req, res) => {
  res.render('signup');
});

router.post('/', checkAuth, async (req, res) => {
  const { name, password, email } = req.body;
  const newUser = await User.create({ name, password: await bcrypt.hash(password, SALT), email });
  req.session.userName = newUser.name;
  req.session.userId = newUser.id;
  console.log(newUser);
  res.redirect('/');
});

module.exports = router;
