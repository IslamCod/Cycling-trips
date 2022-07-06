const router = require("express").Router();

router.route()
.get("/path", async (req, res) => {
  const newTrip = req.body;
  try {
    const result = await Trip.create(newTrip);
    res.json({ status: true });
  } catch (err) {
    res.json({ status: false });
  }

  res.redirect("/cycling-trips");
});

module.exports = router;
