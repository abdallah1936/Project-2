const { Workout, user, favoriteWorkout, associations } = require('../models');

const dashboard = async (req, res) => {
  try {
    const workouts = await Workout.findAll({ where: { userId: req.user.id } });
    res.render('dashboard', { workouts });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workouts', error });
  }
};

const newWorkout_get = async (req, res) => {
  res.render('workouts/new');
};

const newWorkout_post = async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      ...req.body,
      userId: req.user.id,
    });
    res.redirect(`/workouts/${newWorkout.id}`);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout', error });
  }
};

const workoutDetails = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id, { include: user });
    if (workout) {
      res.render('workouts/show', { workout });
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout', error });
  }
};

const editWorkout_get = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (workout) {
      res.render('workouts/edit', { workout });
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout', error });
  }
};

const editWorkout_post = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (workout) {
      await workout.update(req.body);
      res.redirect(`/workouts/${workout.id}`);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout', error });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (workout) {
      await workout.destroy();
      res.redirect('/dashboard');
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout', error });
  }
};

module.exports = {
  dashboard,
  newWorkout_get,
  newWorkout_post,
  workoutDetails,
  editWorkout_get,
  editWorkout_post,
  deleteWorkout,
};