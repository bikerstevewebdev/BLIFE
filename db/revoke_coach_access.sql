UPDATE users SET coach_id = -611
WHERE coach_id = $1;
UPDATE client_coach SET current = false
WHERE coach_id = $1 AND current = true;
UPDATE coach_requests SET active = false
WHERE req_id = $1 AND active = true;
SELECT u.fullname, u.last_login, u.coach_id, u.profile_pic, u.username FROM coach_requests cr
JOIN users u ON u.user_id = cr.user_id
WHERE cr.active = true;