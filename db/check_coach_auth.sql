SELECT * FROM client_coach
WHERE client_coach_id = $1 AND client_id = $2 AND coach_id = $3 AND current = true;