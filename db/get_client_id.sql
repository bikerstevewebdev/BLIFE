SELECT client_coach_id FROM client_coach
WHERE user_id = $1 AND current = true;