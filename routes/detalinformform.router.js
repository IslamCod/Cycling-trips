const router = require('express').Router();
const { Trip } = require('../db/models');

router.get('/:id', async (req, res) => {
  const trip = await Trip.findOne({ where: { id: req.params.id } }); // include user - find name author
  const authorTrip = trip.user_id; // dataVelue

  res.render('detalinformform', { userButNoAuthor: req.session.userId && (req.session.userId !== authorTrip), trip });
});

module.exports = router;
