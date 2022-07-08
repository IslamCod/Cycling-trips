const router = require('express').Router();
const { Trip } = require('../db/models');
const { checkUser } = require('../middleware/checkUser');

router.get('/', checkUser, (req, res) => { // id
  res.render('createnewform');
});

router.post('/', async (req, res) => {
  const {
    title, length, start, finish, location,
  } = req.body;

  try {
    if (title && length && start && finish && location) {
      await Trip.create({
        title,
        user_id: req.session.userId,
        length,
        start: JSON.stringify(start),
        finish: JSON.stringify(finish),
        location,
      });
      res.sendStatus(200);
    } else { res.sendStatus(404); }
  } catch (er) {
    res.redirect('/createnewform');
  }
});

module.exports = router;
