-- WHERE title LIKE ('%'||$1||'%')
SELECT * FROM workouts
WHERE title ~* $1