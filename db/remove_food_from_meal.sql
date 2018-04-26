DELETE FROM meal_foods
WHERE meal_id = $1 AND food_id = $2 AND quantity = $7;
UPDATE meals SET total_p = (total_p - $3), total_c = (total_c - $4), total_f = (total_f - $5), total_fib = (total_fib - $6)
WHERE meal_id = $1;
SELECT * FROM meals
WHERE meal_id = $1