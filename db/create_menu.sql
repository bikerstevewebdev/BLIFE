-- CREATE TABLE menus (
--     menu_id SERIAL PRIMARY KEY,
--     title VARCHAR(60),
--     author_id INTEGER,
--     img TEXT    
-- );

INSERT INTO menus (title, author_id, total_p, total_c, total_f, total_fib, img)
VALUES ($1, $2, 0, 0, 0, 0, $3)
RETURNING *