const router = require('express').Router();

router.get('/:name', async (req, res) => {
  res.render('detalinformform');
});

module.exports = router;
