SELECT w.*, uw.user_workout_id FROM workouts w
JOIN user_workouts uw ON uw.workout_id = w.workout_id
WHERE uw.workout_id IN (SELECT workout_id FROM user_workouts
                    WHERE user_id = $1 AND current = true AND assigned = true)