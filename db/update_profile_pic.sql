UPDATE users SET profile_pic = $2
WHERE user_id = $1;
SELECT * FROM users
WHERE user_id = $1;