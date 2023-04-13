const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workout');

app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000
app.set('view engine', 'ejs');

app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: true
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/workouts', workoutRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
