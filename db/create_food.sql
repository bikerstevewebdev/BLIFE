
-- name VARCHAR(25) NOT NULL,
--     author_id references users(user_id),
--     pro INTEGER NOT NULL,
--     carb INTEGER NOT NULL,
--     fat INTEGER NOT NULL,
--     fiber INTEGER
INSERT INTO foods (name, author_id, pro, carb, fat, fiber)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *

