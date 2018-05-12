-- SELECT m.*, u.username FROM messages m
-- JOIN users u ON u.coach_id = m.coach_id
-- WHERE m.client_id = $1;
SELECT m.*, u.profile_pic FROM messages m
JOIN users u ON u.username = m.sender
WHERE m.client_id = $1;