const router = require('express').Router();

router.get('/:id', async (req, res) => {
  res.render('createnewform');
});

module.exports = router;
