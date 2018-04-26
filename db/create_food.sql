    -- food_id SERIAL PRIMARY KEY,
    -- name VARCHAR(25) NOT NULL,
    -- author_id INTEGER,
    -- pro INTEGER NOT NULL,
    -- carb INTEGER NOT NULL,
    -- fat INTEGER NOT NULL,
    -- fiber INTEGER
    -- img TEXT 
INSERT INTO foods (name, author_id, pro, carb, fat, fiber, img)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *