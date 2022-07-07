const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('createnewform');
});

module.exports = router;
