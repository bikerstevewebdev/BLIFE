    -- meals references meals(meal_id),
    -- name VARCHAR(60),    
    -- author_id references users(user_id)

INSERT INTO meals (name, meals, author_id)
VALUES ($1, $2, $3)
RETURNING *