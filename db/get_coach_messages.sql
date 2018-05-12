-- SELECT m.*, u.username FROM messages m
-- JOIN client_coach cc ON cc.client_coach_id = m.client_id
-- JOIN users u ON u.user_id = cc.client_id
-- WHERE m.client_id = $1;
SELECT m.*, u.profile_pic FROM messages m
JOIN users u ON u.username = m.sender
WHERE m.client_id = $1;
