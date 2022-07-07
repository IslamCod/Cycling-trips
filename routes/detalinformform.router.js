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

  let posts;
  try {
    posts = await Like.findAll({ order: [["id", "DESC"]] });
  } catch (error) {
    return res.render("error", {
      message: "Не удалось получить записи из базы данных.",
      error: {},
    });
  }
  res.render("detalinformform", { trip, user, posts });
});

// /cycling-trips/detalinformform/comment
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  // const comment = req.body;
  const comment = await Like.create({
    user_id: 1,
    trip_id: id,
    comment: req.body.comment,
    like: 3,
  });
  console.log("!!!!", comment);

  res.json(comment);
});

module.exports = router;
