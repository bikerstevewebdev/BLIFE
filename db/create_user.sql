INSERT INTO users (username, email, profile_pic, auth_id, date_created, last_login) 
VALUES ($1, $2, $3, $4, $5, $5)
returning *    