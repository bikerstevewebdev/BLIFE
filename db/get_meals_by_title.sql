SELECT * FROM meals
WHERE title LIKE ('%'||$1||'%')