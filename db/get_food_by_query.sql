SELECT * FROM foods
WHERE name LIKE ('%'||$1||'%')