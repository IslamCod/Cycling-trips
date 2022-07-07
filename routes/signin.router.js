const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', async (req, res) => {
  res.render('signin');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = { id: user.id, email: user.email };
    return res.redirect('/');
  }
  return res.render('signup'); // вставить hbs и вы ввели не верную почту или пароль
});




module.exports = router;
