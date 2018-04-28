INSERT INTO workouts (title, author_id, type, img)
VALUES ($1, $2, $3, $4)
RETURNING *;