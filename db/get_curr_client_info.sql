SELECT cc.client_coach_id, u.username, u.profile_pic, u.fullname, u.email FROM client_coach cc
JOIN users u ON u.user_id = cc.user_id
WHERE cc.client_coach_id = $1 AND cc.current = true;