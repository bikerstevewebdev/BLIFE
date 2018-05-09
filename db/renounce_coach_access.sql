UPDATE users SET coach_id = -9
WHERE user_id = $1;
SELECT * FROM users WHERE user_id = $1;