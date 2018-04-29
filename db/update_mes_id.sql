UPDATE users SET curr_mes_id = $2
WHERE user_id = $1;
SELECT * FROM users
WHERE user_id = $1