const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), async (req, res) => {
  req.session.user = req.user;
  req.session.isAuthenticated = true;
  res.redirect("/");

});

module.exports = router;
