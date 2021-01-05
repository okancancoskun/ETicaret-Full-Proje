const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("../config.json");
const models = require("../models");

module.exports = passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientKey,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await models.User.findOne({ "google.id": profile.id });
        if (user) {
          done(null, user);
        } else {
          const newUser = new models.User({
            google: profile,
            isSocialAuth: true,

            name: profile.name.givenName,
            lastName: profile.name.familyName,

            cart: { items: [] },
          });
          await newUser.save();

          done(null, newUser);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  models.User.findById(id, (err, user) => done(err, user));
});

