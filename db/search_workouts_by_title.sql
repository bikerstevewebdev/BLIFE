SELECT * FROM workouts
WHERE title LIKE ('%'||$1||'%')