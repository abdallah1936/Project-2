const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models');
const authRoutes = require('./routes/auth.js');
const workoutRoutes = require('./routes/workout');
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const path = require("path");
const bcrypt = require('bcrypt');


app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: true
}));

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await db.user.findOne({ where: { username: username } });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const validPassword = await user.validPassword(password);

      if (!validPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});



app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.use('/users', authRoutes); 
app.use('/workouts', workoutRoutes);

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});


app.listen(8000, () => {
    console.log('Server started on port 8000');
});