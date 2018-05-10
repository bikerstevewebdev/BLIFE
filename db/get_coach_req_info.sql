SELECT cc.*, u.fullname, u.username FROM client_coach cc
JOIN users u ON u.coach_id = cc.coach_id
WHERE cc.user_id = $1 AND cc.current = true AND cc.req_pending = true;