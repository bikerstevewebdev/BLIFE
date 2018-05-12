-- WHERE name LIKE ('%'||$1||'%')
SELECT * FROM exercises
WHERE name ~* $1