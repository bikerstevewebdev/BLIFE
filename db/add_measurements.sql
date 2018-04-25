--     waist INTEGER,
--     neck INTEGER,
--     chest INTEGER,
--     height INTEGER,
--     weight INTEGER,
--     bf INTEGER,
--     date_taken DATE,
--     member_id INTEGER

INSERT INTO measurements (waist, neck, chest, height, weight, bf, date_taken, member_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
returning *
