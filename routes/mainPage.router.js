const router = require("express").Router();
const { Trip } = require("../db/models");

// router.get('/', (req, res) => {
//   res.redirect('/trips');
// });

router.get("/cycling-trips", async (req, res) => {
  const allTrips = await Trip.findAll();
  console.log({allTrips});
  res.render("mainPage", { allTrips });
});

module.exports = router;
