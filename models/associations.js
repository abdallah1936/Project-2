const user = require('./user');
const workout = require('./workout');
const favoriteWorkout = require('./favoriteWorkout');

user.hasMany(workout);
workout.belongsTo(user);

user.hasMany(favoriteWorkout);
favoriteWorkout.belongsTo(user);

workout.hasMany(favoriteWorkout);
favoriteWorkout.belongsTo(workout);