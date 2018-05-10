INSERT INTO client_coach (user_id, coach_id)
VALUES ($1, $2);
UPDATE users SET coach_id = -411
WHERE user_id = $1;