SELECT cc.client_coach_id, u.username, u.fullname, u.email, u.profile_pic FROM client_coach cc
JOIN users u ON u.coach_id = cc.coach_id
WHERE cc.client_coach_id = $1;