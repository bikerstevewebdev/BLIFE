UPDATE users SET fullname = $2
WHERE user_id = $1;
SELECT * FROM users;