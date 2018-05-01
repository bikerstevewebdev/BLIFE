UPDATE photos SET current = false
WHERE member_id = $1 AND photo_id = $2;
SELECT p.url, p.photo_id, p.date_added FROM photos p
WHERE member_id = $1 AND current = true;