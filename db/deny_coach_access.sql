UPDATE coach_requests SET processing = false, accepted = false
WHERE req_id = $1;
UPDATE users SET coach_id = 0
WHERE user_id = $2;
SELECT * FROM coach_requests
WHERE processing = true;