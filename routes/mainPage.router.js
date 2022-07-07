const router = require('express').Router();

// router.get('/', (req, res) => {
//   res.redirect('/trips');
// });

router.get('/cycling-trips', (req, res) => {
    console.log(req.query);
  res.render('mainPage');
});

module.exports = router;
