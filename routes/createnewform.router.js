const router = require('express').Router();

router.get('/', (req, res) => { // id 
  res.render('createnewform');
});

router.post('/', (req, res) => {
  console.log(11111);
  console.log(req.body);
    
})

module.exports = router;
