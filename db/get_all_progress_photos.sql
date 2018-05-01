SELECT url, photo_id, date_added, current, type FROM photos
WHERE member_id = $1 AND type = 'progress';