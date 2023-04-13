const { Workout, user, favoriteWorkout, associations } = require('../models');

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.findAll({ include: user });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workouts', error });
  }
};

const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id, { include: user });
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout', error });
  }
};

const createWorkout = async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout', error });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (workout) {
      await workout.update(req.body);
      res.status(200).json(workout);
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
      res.status(204).json({ message: 'Workout deleted' });
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout', error });
  }
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
