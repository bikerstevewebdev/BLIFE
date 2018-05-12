--   user_id SERIAL PRIMARY KEY,
--     coach_id DEFAULT 0,
--     is_admin BOOLEAN DEFAULT false,
--     email VARCHAR(125),
--     username VARCHAR(25) NOT NULL,
--     fullname VARCHAR(100),
--     profile_pic TEXT,
--     date_created DATE NOT NULL,
--     curr_pro REAL DEFAULT 0,
--     curr_carb REAL DEFAULT 0,
--     curr_fat REAL DEFAULT 0,
--     curr_mes_id INTEGER DEFAULT 0,
--     auth_id TEXT NOT NULL,
--     last_login DATE,
--     has_coach BOOLEAN DEFAULT false
-- );


SELECT u.fullname, u.username, u.email, u.curr_pro, u.curr_carb, u.curr_fat, u.profile_pic, cc.client_coach_id, u.last_login, m.* FROM users u
JOIN client_coach cc ON cc.user_id = u.user_id
JOIN measurements m ON m.mes_id = u.curr_mes_id
WHERE cc.client_coach_id = $1;