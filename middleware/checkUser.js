const checkUser = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else res.redirect('/signin');
};
module.exports = { checkUser };
