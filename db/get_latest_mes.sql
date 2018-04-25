SELECT * FROM measurements
WHERE mes_id IN (SELECT mes_id FROM measurements
                    WHERE member_id = $1
                    ORDER BY mes_id DESC)