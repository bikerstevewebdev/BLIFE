SELECT DISTINCT ml.meal_id, ml.title, ml.total_p, ml.total_c, ml.total_f, ml.total_fib, ml.img_url, mn.menu_meals_id FROM meals ml
JOIN menu_meals mn ON mn.meal_id =  ml.meal_id
WHERE mn.menu_meals_id IN (SELECT menu_meals_id FROM menu_meals
                    WHERE menu_id = $1)
ORDER BY mn.menu_meals_id;