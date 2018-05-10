SELECT u.fullname, c.user_id, c.client_coach_id, u.last_login FROM users u
JOIN client_coach c ON c.user_id = u.user_id
WHERE c.user_id IN (SELECT user_id FROM client_coach
WHERE coach_id = $1 AND current = true);