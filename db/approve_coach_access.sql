UPDATE coach_requests SET active = true, processing = false, accepted = true
WHERE req_id = $1;
UPDATE users SET coach_id = $1
WHERE user_id = $2;
SELECT * FROM coach_requests
WHERE processing = true;