const router = require('express').Router();

router.get('/', (req, res) => {
  res.redirect('/cycling-trips');
});

router.get('/cycling-trips', (req, res) => {
  res.render('mainPage');
});

module.exports = router;
