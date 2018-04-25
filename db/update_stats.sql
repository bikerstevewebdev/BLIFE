UPDATE users SET curr_pro = $1, curr_carb = $2, curr_fat = $3
WHERE auth_id = $4
returning *