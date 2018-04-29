SELECT uw.user_workout_id, w.* FROM user_workout uw
JOIN workouts w ON w.workout_id = uw.workout_id
WHERE uw.user_id = $1 AND uw.current = true