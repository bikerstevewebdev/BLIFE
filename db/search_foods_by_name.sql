-- WHERE name LIKE ('%'||$1||'%')
SELECT * FROM foods
WHERE name ~* $1