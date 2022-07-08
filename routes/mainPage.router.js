const router = require('express').Router();
const { Trip, User } = require('../db/models');

router.get('/', (req, res) => {
  res.redirect('/cycling-trips');
});

router.get('/cycling-trips', async (req, res) => {
  const allTripsJson = await Trip.findAll({
    include: [
      { model: User, where: {} },
    ],
  });
  const allTripsArr = JSON.parse(JSON.stringify(allTripsJson, null, 2));
  const allTrips = allTripsArr.map((el) => ({
    id: el.id, title: el.title, length: el.length, userName: el.User.name,
  }));
  res.render('mainPage', { allTrips });
});

router.get('/cycling-trips/:id', async (req, res) => { // поиск маршрута для отрисовки его карты и подробной информации - Миля
  const trip = await Trip.findOne({ where: { id: req.params.id } });
  res.json(trip);
});

module.exports = router;
