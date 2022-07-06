const router = require('express').Router();
// const {User} = require('../db/models')
// const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
  res.render('signin');
});

module.exports = router;
