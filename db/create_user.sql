INSERT INTO users (username, email, profile_pic, auth_id, date_created) 
VALUES ($1, $2, $3, $4, $5)
returning *    