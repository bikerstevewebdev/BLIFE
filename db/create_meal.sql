-- title VARCHAR(25) NOT NULL,
--     author_id references users(user_id),
--     total_p INTEGER NOT NULL,
--     total_c INTEGER NOT NULL,
--     total_f INTEGER NOT NULL,
--     total_fib INTEGER,
--     ingredients text


INSERT INTO meals (title, author_id, total_p, total_c, total_f, ingredients)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *