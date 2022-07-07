const router = require("express").Router();

router.route()
.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await Trip.create(newTrip);
    console.log(result);
    res.json(result);
  } catch (err) {
    res.json({ status: false });
  }

  res.redirect("/cycling-trips/createnewform");
});

module.exports = router;
