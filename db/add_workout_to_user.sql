INSERT INTO user_workouts (user_id, workout_id)
VALUES ($1, $2);
SELECT w.*, uw.user_workout_id FROM workouts w
JOIN user_workouts uw ON uw.workout_id = w.workout_id
WHERE uw.user_workout_id IN (SELECT user_workout_id FROM user_workouts
                    WHERE user_id = $1 and current = true)