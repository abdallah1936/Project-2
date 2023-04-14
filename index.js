const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workout');
const bodyParser = require("body-parser");
const path = require("path");

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

passport.use(new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
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

app.use('/auth', authRoutes);
app.use('/workouts', workoutRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(8000, () => {
    console.log('Server started on port 3000');
});
