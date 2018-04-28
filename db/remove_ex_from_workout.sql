DELETE FROM workout_ex 
WHERE workout_ex_id = $1;
SELECT * FROM workout_ex
WHERE workout_id = $2;