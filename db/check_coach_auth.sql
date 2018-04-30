SELECT * FROM client_coach
WHERE client_id = $1 AND coach_id = $2 AND current = true;