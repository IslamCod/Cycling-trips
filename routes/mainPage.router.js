const router = require('express').Router();

// router.get('/', (req, res) => {
//   res.redirect('/trips');
// });

router.get('/cycling-trips', (req, res) => {
  res.render('mainPage');
});

module.exports = router;
