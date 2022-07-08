const router = require('express').Router();
const { Trip } = require('../db/models');
const { User } = require('../db/models');
const { Like } = require('../db/models');

router.get('/:id', async (req, res) => {
  const tripA = await Trip.findOne({ where: { id: req.params.id } }); // include user - find name author
  const authorTrip = tripA.user_id; // dataVelue
  const nameAuthor = await User.findOne({ where: { name: req.params.name } });
  const ferstlikeforuser = await Like.findOne({ where: { id: req.params.user_id } });

  const { id } = req.params.id;
  // console.log(id);
  const trip = await Trip.findOne({ where: { user_id: id } });
  // console.log(">>>>>", trip);
  const user = await User.findOne({ where: { id } });

  let posts;
  try {
    posts = await Like.findAll({ order: [['id', 'DESC']] });
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
  res.render('detalinformform', {
    trip, user, posts, userButNoAuthor: req.session.userId && (req.session.userId !== authorTrip) && (ferstlikeforuser === null),
  });
});

// /cycling-trips/detalinformform/comment
router.post('/', async (req, res) => {
  const { id } = req.params;
  // const comment = req.body;
  const comment = await Like.create({
    user_id: 1,
    trip_id: id,
    comment: req.body.comment,
    like: 3,
  });
  console.log('!!!!', comment);

  res.json(comment);
});

module.exports = router;
