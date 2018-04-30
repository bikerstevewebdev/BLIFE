UPDATE client_coach SET req_pending = false, accepted = true
WHERE client_coach_id = $1;