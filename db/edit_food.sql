-- food_id, p, c, f, fib, img

UPDATE foods SET name = $2, pro = $3, carb = $4, fat = $5, fiber = $6, img = $7
WHERE food_id = $1;
SELECT * FROM foods
WHERE food_id = $1