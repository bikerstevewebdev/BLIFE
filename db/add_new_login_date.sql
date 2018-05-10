UPDATE users SET last_login = $2
WHERE auth_id = $1;