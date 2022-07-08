const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
// const { checkSession } = require('../middleware/checkAuth');

router.get('/', async (req, res) => {
  res.render('signin');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userName = user.name;
    req.session.userId = user.id;
    // console.log(res.locals);
    return res.redirect('/');
  }
  return res.render('error');
});

module.exports = router;
