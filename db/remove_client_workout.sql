UPDATE user_workouts SET current = false
WHERE user_workout_id = $2;
SELECT uw.user_workout_id, w.* FROM workouts w
JOIN user_workouts uw ON uw.workout_id = w.workout_id
WHERE uw.user_workout_id IN (SELECT user_workout_id FROM user_workouts
                    WHERE current = true AND user_id = $1 AND assigned = true)