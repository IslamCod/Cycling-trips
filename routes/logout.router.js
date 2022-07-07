const router = require('express').Router();

router.get('/', (req, res) => {
  req.session.destroy();
  res.clearCookie('cycling-trips').redirect('/');
});

module.exports = router;
