INSERT INTO user_workouts (user_id, workout_id, assigned)
VALUES ($1, $2, true);
SELECT uw.user_workout_id, w.* FROM workouts w
JOIN user_workouts uw ON uw.workout_id = w.workout_id
WHERE uw.user_workout_id IN (SELECT user_workout_id FROM user_workouts
                    WHERE current = true AND user_id = $1 AND assigned = true)