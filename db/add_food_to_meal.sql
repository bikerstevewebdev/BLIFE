INSERT INTO meal_foods (meal_id, food_id)
VALUES ($1, $2);
UPDATE meals SET total_p = $3, total_c = $4, total_f = $5, total_fib = $6
WHERE meal_id = $1;
SELECT * FROM meals
WHERE meal_id = $1