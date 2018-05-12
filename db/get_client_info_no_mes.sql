SELECT u.fullname, u.username, u.email, u.curr_pro, u.curr_carb, u.curr_fat, u.profile_pic, cc.client_coach_id, u.last_login FROM users u
JOIN client_coach cc ON cc.user_id = u.user_id
WHERE cc.client_coach_id = $1;