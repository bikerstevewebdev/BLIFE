UPDATE user_workouts SET current = false
WHERE user_workout_id = $2;
SELECT uw.user_workout_id, w.* FROM user_workouts uw
JOIN workouts w ON w.workout_id = uw.workout_id
WHERE uw.user_id = $1 AND uw.current = true