SELECT * FROM exercises
WHERE name LIKE ('%'||$1||'%')