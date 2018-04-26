SELECT * FROM foods
WHERE food_id IN (SELECT food_id FROM meal_foods
                    WHERE meal_id = $1)