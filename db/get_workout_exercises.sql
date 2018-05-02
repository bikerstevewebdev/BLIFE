SELECT we.*, e.name, e.type, e.main_muscle_group, e.img, e.video FROM workout_ex we
JOIN exercises e ON e.ex_id = we.ex_id
WHERE we.workout_id = $1;