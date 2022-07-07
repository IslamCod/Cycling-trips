const router = require('express').Router();

router.get('/', (req, res) => {
  res.redirect('/cycling-trips');
});

module.exports = router;
