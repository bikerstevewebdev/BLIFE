DELETE FROM menu_meals
WHERE menu_meals_id = $1
UPDATE menus SET total_p = (total_p - $3), total_c = (total_c - $4), total_f = (total_f - $5), total_fib = (total_fib - $6)
WHERE menu_id = $2;
SELECT * FROM menus
WHERE menu_id = $2;