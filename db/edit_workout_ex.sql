UPDATE workout_ex SET reps = $3, sets = $4, rest_time = $5, weight = $6, order = $7
WHERE workout_ex_id = $1;
SELECT * FROM workout_ex
WHERE workout_id = $2;