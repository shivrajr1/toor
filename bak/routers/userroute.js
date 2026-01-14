const router = require("express").Router();
const { LoginFailed, Login, Logout, Signup } = require('../controllers/User');
const { islogin } = require('../middlewares/isLogin');
const passport = require("passport");

router.route("/login")
  .get(LoginFailed)
  .post(passport.authenticate('local', { failureRedirect: "/api/login" })
    , Login)

router.route("/logout")
  .delete(islogin, Logout)

router.route('/signup')
  .post(Signup)

module.exports = router;