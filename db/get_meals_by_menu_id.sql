SELECT DISTINCT ml.meal_id, ml.title, ml.total_p, ml.total_c, ml.total_f, ml.total_fib, ml.img, mn.menu_meals_id FROM meals ml
JOIN menu_meals mn ON mn.meal_id =  ml.meal_id
WHERE ml.meal_id IN (SELECT meal_id FROM menu_meals
                    WHERE menu_id = $1)