const router = require('express').Router();
const { Like } = require('../db/models');
const { Trip } = require('../db/models');

router.get('/', async (req, res) => {
  const {
    user_id, trip_id, like, comment,
  } = req.body;
  const newLike = await Like.create({
    user_id, trip_id, like, comment,
  });
  const numLike = await Like.findAll({ where: { trip_id } });
  let sumLike = 0;
  for (let i = 0; i < numLike.length; i++) {
    sumLike += Number(numLike[i].like);
  }
  sumLike = sumLike.toFixed(2);
  const reiting = sumLike / numLike.length;
  await Trip.update({ reiting }, { where: { id: trip_id } });
  res.render('/');
});

module.exports = router;
