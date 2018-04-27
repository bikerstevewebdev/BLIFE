-- CREATE TABLE foods (
--     food_id SERIAL PRIMARY KEY,
--     name VARCHAR(25) NOT NULL,
--     author_id INTEGER,
--     pro INTEGER NOT NULL,
--     carb INTEGER NOT NULL,
--     fat INTEGER NOT NULL,
--     fiber INTEGER,
--     img TEXT
-- );

SELECT DISTINCT f.*, mf.quantity, mf.meal_food_id FROM foods f
JOIN meal_foods mf ON mf.food_id =  f.food_id
WHERE f.food_id IN (SELECT food_id FROM meal_foods
                    WHERE meal_id = $1)
                    AND meal_id = $1