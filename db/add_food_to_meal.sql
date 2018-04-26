INSERT INTO meal_foods (meal_id, food_id, quantity)
VALUES ($1, $2, $3);
UPDATE meals SET total_p = $4, total_c = $5, total_f = $6, total_fib = $7
WHERE meal_id = $1;
SELECT * FROM meals
WHERE meal_id = $1