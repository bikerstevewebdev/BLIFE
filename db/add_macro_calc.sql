INSERT INTO macro_calcs (p, c, f, date_calced, member_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING *