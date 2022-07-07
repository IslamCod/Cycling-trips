const router = require("express").Router();
const { Trip } = require("../db/models");
const { User } = require("../db/models");
const { Like } = require("../db/models");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const trip = await Trip.findOne({ where: { user_id: id } });
  // console.log(">>>>>", trip);
  const user = await User.findOne({ where: { id: id } });

  res.render("detalinformform", { trip, user });
});

// /cycling-trips/detalinformform/comment
router.post("/:id", async (req, res) => {
  const comment = req.body;
  // const comments =  await Like.create({
  //   user_id: user.id,
  //   trip_id: id,
  //   comment,
  //   like: 3,
  // });
  res.json({ message: "Ok" });
});

module.exports = router;
