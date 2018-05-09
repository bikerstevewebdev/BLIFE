INSERT INTO messages (client_id, coach_id, date_sent, content, sender, chat_room, sender_id)
VALUES ($1, $2, $3, $4, $5, $6, $7);
SELECT m.*, u.username FROM messages m
JOIN users u ON u.coach_id = m.coach_id
WHERE m.client_id = $1;