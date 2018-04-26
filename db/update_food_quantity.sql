UPDATE meal_foods SET quantity = $3
WHERE meal_id = $1 AND food_id = $2;
UPDATE meals SET total_p = (total_p + $4), total_c = (total_c + $5), total_f = (total_f + $6), total_fib = (total_fib + $7)
WHERE meal_id = $1;
SELECT * FROM meals
WHERE meal_id = $1