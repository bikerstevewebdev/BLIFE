SELECT m.*, u.username FROM messages m
JOIN users u ON u.coach_id = m.coach_id
WHERE m.client_id = $1;