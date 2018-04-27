-- CREATE TABLE exercises (
--     ex_id SERIAL PRIMARY KEY,
--     name VARCHAR(60) NOT NULL,
--     type VARCHAR(25) NOT NULL,
--     main_muscle_group VARCHAR(25),
--     author_id INTEGER,
--     img TEXT,
--     video TEXT
-- );
UPDATE exercises SET name = $2, type = $3, main_muscle_group = $4, video = $5, img = $6
WHERE ex_id = $1;
SELECT * FROM exercises
WHERE ex_id = $1