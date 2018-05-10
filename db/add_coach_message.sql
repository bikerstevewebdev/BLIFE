INSERT INTO messages (client_id, coach_id, date_sent, content, sender, chat_room, sender_id)
VALUES ($1, $2, $3, $4, $5, $6, $7);
SELECT m.*, u.username, u.profile_pic FROM messages m
JOIN client_coach cc ON cc.client_coach_id = m.client_id
JOIN users u ON u.user_id = cc.client_id
WHERE m.client_id = $1;