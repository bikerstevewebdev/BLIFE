INSERT INTO photos (url, member_id, type)
VALUES ($1, $2, $3);
SELECT p.url, p.photo_id, p.date_added FROM photos p
WHERE member_id = $2 AND current = true;