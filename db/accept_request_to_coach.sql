UPDATE client_coach SET req_pending = false, accepted = true
WHERE client_coach_id = $1;
UPDATE users SET coach_id = -7, has_coach = true
WHERE user_id = $2;
SELECT u.fullname FROM users u
JOIN client_coach cc ON cc.coach_id = u.coach_id
WHERE cc.client_coach_id = $1;