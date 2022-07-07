const router = require('express').Router();
const { Trip } = require('../db/models');

router.get('/', (req, res) => { // id
  res.render('createnewform');
});

router.post('/', async (req, res) => {
  const {
    title, length, start, finish, location,
  } = req.body;

  try {
    console.log(req.body);
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
    console.log(er);
  }
});

module.exports = router;
