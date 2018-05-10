SELECT username, email, user_id, last_login, profile_pic, fullname FROM users
WHERE email = $1;