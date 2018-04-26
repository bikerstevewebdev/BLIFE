-- title VARCHAR(25) NOT NULL,
--     author_id references users(user_id),
--     total_p INTEGER NOT NULL,
--     total_c INTEGER NOT NULL,
--     total_f INTEGER NOT NULL,
--     total_fib INTEGER,
--     ingredients text


INSERT INTO meals (title, author_id, img_url, total_p, total_c, total_f, total_fib)
VALUES ($1, $2, $3, 0, 0, 0, 0)
RETURNING *