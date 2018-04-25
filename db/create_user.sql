INSERT INTO users (username, profile_pic, auth_id, date_created) 
VALUES ($1, $2, $3, $4)
returning *    