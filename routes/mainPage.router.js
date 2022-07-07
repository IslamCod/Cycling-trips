const router = require('express').Router();

// router.get('/', (req, res) => {
//   res.redirect('/trips');
// });

router.get('/cycling-trips', (req, res) => {
  const { user_id, place, length } = req.body;

  res.render('mainPage');
});

module.exports = router;
