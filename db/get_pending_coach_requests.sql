SELECT cr.*, u.username, u.profile_pic FROM coach_requests cr
JOIN users u ON u.user_id = cr.user_id
WHERE cr.processing = true;