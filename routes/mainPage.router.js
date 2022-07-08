const router = require('express').Router();
const { Trip } = require('../db/models');

router.get('/', (req, res) => {
  res.redirect('/cycling-trips');
});

router.get('/cycling-trips', async (req, res) => {
  const allTrips = await Trip.findAll();
  console.log({ allTrips });
  res.render('mainPage', { allTrips });
});

router.get('/cycling-trips/:id', async (req, res) => { //поиск маршрута для отрисовки его карты и подробной информации - Миля
  const trip = await Trip.findOne({where: {id: req.params.id}});
  res.json(trip);
});

module.exports = router;
