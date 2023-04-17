const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");

router.get('/dashboard', isLoggedIn, workoutController.dashboard);
router.get('/workouts/new', isLoggedIn, workoutController.newWorkout_get);
router.post('/workouts/new', isLoggedIn, workoutController.newWorkout_post);
router.get('/workouts/:id', isLoggedIn, workoutController.workoutDetails);
router.get('/workouts/:id/edit', isLoggedIn, workoutController.editWorkout_get);
router.post('/workouts/:id/edit', isLoggedIn, workoutController.editWorkout_post);
router.post('/workouts/:id/delete', isLoggedIn, workoutController.deleteWorkout);

module.exports = router;
