const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models');
const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workout');
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const path = require("path");
const bcrypt = require('bcryptjs');


const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ where: { username: username } }).then((user) => {
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      bcrypt.compare(password, user.password, function (err, res) {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success_messages = req.flash('success_messages');
  res.locals.error_messages = req.flash('error_messages');
  next();
});

app.use('/users', authRoutes);
app.use('/workouts', workoutRoutes);

app.get('/', (req, res) => {
  res.redirect('/users/login');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
