SELECT p.url, p.photo_id, p.date_added FROM photos p
WHERE member_id = $1 AND current = true;