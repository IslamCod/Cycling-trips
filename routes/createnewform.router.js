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
  console.log(req.body);
  try {
    await Trip.create({
      title,
      user_id: req.session.user_id,
      length,
      start: JSON.stringify(start),
      finish: JSON.stringify(finish),
      location,
    });

    res.json({
      title, length, start, finish, location,
    });
  } catch (er) {

  }
});

module.exports = router;
