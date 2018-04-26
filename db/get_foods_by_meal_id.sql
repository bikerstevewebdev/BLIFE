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

SELECT DISTINCT f.food_id, f.name, f.pro, f.carb, f.fat, f.fiber, f.img, mf.quantity FROM foods f
JOIN meal_foods mf ON mf.food_id =  f.food_id
WHERE f.food_id IN (SELECT DISTINCT food_id FROM meal_foods
                    WHERE meal_id = $1)