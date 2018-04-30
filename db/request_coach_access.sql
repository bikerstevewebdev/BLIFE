--   coach_request (
--     req_id SERIAL PRIMARY KEY,
--     user_id INTEGER,
--     accepted BOOLEAN DEFAULT false,
--     active BOOLEAN DEFAULT false,
--     processing DEFAULT true
-- );


INSERT INTO coach_request (user_id)
VALUES ($1);
UPDATE users SET coach_id = -1
WHERE user_id = $1;
SELECT * FROM users
WHERE user_id = $1