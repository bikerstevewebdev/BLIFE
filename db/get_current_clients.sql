SELECT u.fullname, c.client_id, c.client_coach_id, u.last_login FROM users u
JOIN client_coach c ON c.client_id = u.user_id
WHERE c.client_id IN (SELECT client_id FROM client_coach
WHERE coach_id = $1 AND current = true);