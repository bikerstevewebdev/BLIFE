UPDATE workout_ex SET reps = $3, sets = $4, rest_time = $5, weight = $6, ex_order = $7
WHERE workout_ex_id = $1;
SELECT we.*, e.* FROM workout_ex we
JOIN exercises e ON e.ex_id = we.ex_id
WHERE we.workout_id = $2