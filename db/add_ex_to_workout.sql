-- CREATE TABLE workout_ex (
--     workout_ex_id SERIAL PRIMARY KEY,
--     workout_id INTEGER,
--     order INTEGER,
--     reps INTEGER,
--     sets INTEGER,
--     rest_time INTEGER,
--     weight INTEGER,
--     ex_id INTEGER
-- );

INSERT INTO workout_ex (workout_id, ex_id, order, reps, sets, rest_time)
VALUES ($1, $2, $3, 1, 1, 60);
SELECT * FROM workout_ex
WHERE workout_id = $1