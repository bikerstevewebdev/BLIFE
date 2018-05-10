SELECT u.fullname, u.last_login, u.coach_id, u.profile_pic, u.username FROM coach_requests cr
JOIN users u ON u.user_id = cr.user_id
WHERE cr.active = true;