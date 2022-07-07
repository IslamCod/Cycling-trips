const router = require('express').Router();
const { Trip } = require("../db/models")

router.get('/', (req, res) => { // id 
  res.render('createnewform');
});

router.post('/', async (req, res) => {
  const { nameform, length, start, finish, location} = req.body;
  console.log(req.body);
  await Trip.create({ 
    name:nameform, 
    user_id: req.session.user_id,
    length,
    start,
    finish,
    location});
    
    res.json({nameform, length, start, finish, location})
    
})

module.exports = router;
