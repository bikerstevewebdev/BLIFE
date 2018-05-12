-- WHERE title LIKE ('%'||$1||'%')
SELECT * FROM meals
WHERE title ~* $1