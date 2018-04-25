UPDATE users SET curr_pro = $1, curr_carb = $2, curr_fat = $3, curr_mes_id = $4
WHERE user_id = $5;
SELECT * FROM users
WHERE user_id = $5