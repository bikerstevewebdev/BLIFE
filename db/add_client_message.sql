INSERT INTO messages (client_id, coach_id, date_sent, content, sender, ROOM_NAME, sender_id)
VALUES ($1, $2, $3, $4, $5, $6, $7);
SELECT m.*, u.username, u.profile_pic FROM messages m
JOIN users u ON u.coach_id = m.coach_id
WHERE m.client_id = $1;