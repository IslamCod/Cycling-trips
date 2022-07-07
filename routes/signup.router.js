const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const SALT = 10;

router.get('/', async (req, res) => {
  console.log('rooooooouuuuuuttttteeerrrr');
  res.render('signup');
});

router.post('/', async (req, res) => {
  const { name, password, email } = req.body;
  console.log(req.body);
  const newUser = await User.create({ name, password: await bcrypt.hash(password, SALT), email });
  req.session.user = newUser;
  res.redirect('/');
});

module.exports = router;
