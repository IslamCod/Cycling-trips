const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const { checkAuth } = require('../middleware/checkAuth');

router.get('/', async (req, res) => {
  res.render('signin');
});

router.post('/', checkAuth, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userName = user.name;
      req.session.userId = user.id;
      return res.redirect('/');
    }
    return res.render('error');
  } catch (err) {
    res.redirect('/signin');
  }
});

module.exports = router;
