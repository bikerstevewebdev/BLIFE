SELECT * FROM client_coach
WHERE user_id = $1 AND req_pending = true AND accepted = false;