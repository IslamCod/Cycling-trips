const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('detalinformform');
});

module.exports = router;
