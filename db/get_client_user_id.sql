SELECT u.user_id FROM users u
JOIN client_coach cc ON cc.user_id = u.user_id
WHERE cc.client_coach_id = $1;