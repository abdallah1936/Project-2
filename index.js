const express = require('express');
const app = express();
const path = require('path');
const workoutRoutes = require('./routes/workout');
const authRoutes = require('./routes/auth');
const isLoggedIn = require('./middlewares/auth').isLoggedIn;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/workout', workoutRoutes);
app.use('/auth', authRoutes);

// Catch-all 404 route
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
