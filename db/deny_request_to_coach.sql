UPDATE client_coach SET req_pending = false, accepted = false
WHERE client_coach_id = $1;